/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { TRPCError } from '@trpc/server';
import { string, z } from 'zod';
import { env } from '../env';
import { createRouter } from '~/server/createRouter';
import csv from 'csvtojson';
import {
  interpolate,
  filterStars,
  Star,
  bvToRGB,
  ColorFile,
  vmagToSize,
  skyToXY,
} from '~/utils/convenience';
import seedrandom from 'seedrandom';
import fs from 'fs';
import bcrypt from 'bcryptjs';

/**
 * Default selector for Post.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
type Star2D = {
  x: number;
  y: number;
  s: number;
  c: string;
};

type CatalogueFile = {
  ra: number;
  dec: number;
  Name: string;
  HD: string;
  Vmag: number;
  bv: number;
};

type constellation = {
  name: string;
  coordinate: {
    RA: number;
    DEC: number;
  };
};

export const constellationRouter = createRouter()
  .query('get', {
    input: z.object({
      r: z.number(),
      date: z.string(),
    }),
    async resolve({
      input: { r, date },
    }): Promise<{ name: string; pos: Star2D[] }> {
      const generator = seedrandom(date);
      let obj: constellation[] = JSON.parse(
        fs.readFileSync('src/server/data/const.json', 'utf8'),
      );
      const index = Math.floor(generator() * obj.length);
      const constellation = obj[index];
      const ra = constellation?.coordinate.RA || 0;
      const dec = constellation?.coordinate.DEC || 0;
      const filePath = 'src/server/data/asu.tsv';
      const jsonArray: CatalogueFile[] = (
        await csv({ delimiter: ',' }).fromFile(filePath)
      ).map(({ ra, dec, bv, Vmag, Name, HD }) => ({
        ra: Number(ra),
        dec: Number(dec),
        bv: Number(bv),
        Vmag: Number(Vmag),
        Name,
        HD,
      }));
      const stars: Star[] = jsonArray.map(({ ra, dec, bv, Vmag }) => ({
        ra,
        dec,
        bv,
        Vmag,
      }));
      const filteredStars = filterStars(stars, ra, dec, r);
      // get color
      const filePathColor = 'src/server/data/col.tsv';
      const jsonArrayColor: ColorFile[] = (
        await csv({ delimiter: '\t' }).fromFile(filePathColor)
      ).map(({ bv, T, hex, des, r, g, b }) => ({
        bv: Number(bv),
        T: Number(T),
        hex,
        des: Number(des),
        r: Number(r),
        g: Number(g),
        b: Number(b),
      }));
      const colors = bvToRGB(
        filteredStars.map(({ bv }) => bv),
        jsonArrayColor,
      );
      const sizes = vmagToSize(filteredStars.map(({ Vmag }) => Vmag));
      const rotation = generator() * 360;
      const pos = filteredStars.map(({ ra: ra1, dec: dec1 }) =>
        skyToXY(ra1, dec1, ra, dec, rotation),
      );
      const salt = bcrypt.genSaltSync(10);
      const name = bcrypt.hashSync(
        `${constellation?.name.toLowerCase()};${env.KEY}`,
        salt,
      );
      console.log('ANSWER: ', constellation?.name);
      return {
        name,
        pos: pos.map(({ x, y }, i) => ({
          x,
          y,
          c: colors[i]!,
          s: sizes[i]!,
        })),
      };
    },
  })
  .mutation('answer', {
    input: z.object({
      guess: z.string(),
      answer: z.string(),
      answers: z.array(z.string()),
    }),
    resolve({ input: { guess, answer, answers } }): {
      error: string;
      answers: string[];
      correct: boolean;
      done: boolean;
    } {
      if (
        answers.map((ans) => ans.toLowerCase()).includes(guess.toLowerCase())
      ) {
        return {
          error: 'ALREADY_GUESSED',
          answers,
          correct: false,
          done: false,
        };
      }
      let obj: constellation[] = JSON.parse(
        fs.readFileSync('src/server/data/const.json', 'utf8'),
      );
      const constellations = obj.map((item) => item.name);
      if (
        !constellations
          .map((cons) => cons.toLowerCase())
          .includes(guess.toLowerCase())
      ) {
        return {
          error: 'NOT_A_CONSTELLATION',
          answers,
          correct: false,
          done: false,
        };
      }
      const result = bcrypt.compareSync(
        `${guess.toLowerCase()};${env.KEY}`,
        answer,
      );
      return {
        error: '',
        answers: [...answers, guess],
        correct: result,
        done: answers.length === 9,
      };
    },
  });
