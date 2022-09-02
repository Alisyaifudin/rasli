/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
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
import { resolve } from 'path';
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
  .query('name', {
    resolve(): string[] {
      let obj: constellation[] = JSON.parse(
        fs.readFileSync('src/server/data/const.json', 'utf8'),
      );
      return obj.map((item) => item.name);
    },
  })
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
      return {
        name: constellation?.name || 'uwu',
        pos: pos.map(({ x, y }, i) => ({
          x,
          y,
          c: colors[i]!,
          s: sizes[i]!,
        })),
      };
    },
  });
