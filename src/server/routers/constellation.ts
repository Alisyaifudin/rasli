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
}


type CatalogueFile = {
  ra: number;
  dec: number;
  Name: string;
  HD: string;
  Vmag: number;
  bv: number;
};

export const constellationRouter = createRouter()
  .query('getSome', {
    input: z.object({
      limit: z.number().optional().default(10),
      offset: z.number().optional().default(0),
    }),
    async resolve({ input: { limit, offset } }) {
      const filePath = 'src/server/data/asu.tsv';
      const jsonArray = await csv({ delimiter: '\t' }).fromFile(filePath);
      return jsonArray.slice(offset, offset + limit);
    },
  })
  .query('color', {
    input: z.object({
      bv: z.number(),
    }),
    async resolve({ input: { bv } }) {
      const filePath = 'src/server/data/col.tsv';
      const jsonArray = await csv({ delimiter: '\t' }).fromFile(filePath);
      const bvs = jsonArray.map(({ bv }) => Number(bv));
      const rs = jsonArray.map(({ r }) => Number(r));
      const gs = jsonArray.map(({ g }) => Number(g));
      const bs = jsonArray.map(({ b }) => Number(b));
      const r = interpolate(bvs, rs, bv);
      const g = interpolate(bvs, gs, bv);
      const b = interpolate(bvs, bs, bv);
      return { r, g, b };
    },
  })
  .query('get', {
    input: z.object({
      r: z.number(),
      ra: z.number(),
      dec: z.number(),
      date: z.string(),
    }),
    async resolve({ input: { r, ra, dec, date } }): Promise<Star2D[]> {
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
      const generator = seedrandom(date);
      const rotation = generator()*360;
      const pos = filteredStars.map(({ ra: ra1, dec: dec1 }) =>
        skyToXY(ra1, dec1, ra, dec, rotation),
      );
      return pos.map(({ x, y }, i) => ({
        x,
        y,
        c: colors[i]!,
        s: sizes[i]!,
      }))
    },
  });
