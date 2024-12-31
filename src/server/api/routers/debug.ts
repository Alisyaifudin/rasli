import { createTRPCRouter, publicProcedure } from "src/server/api/trpc";
import { coneFilter } from "src/utils/coneFilter";
import readCsv from "src/utils/read-csv";
import { z } from "zod";
import { skyToXY } from "src/utils/skyToXY";
import path from "path";

export const constellationSchema = z.object({
  name: z.string(),
  ra: z.string(),
  dec: z.string(),
  radius: z.string(),
});

export const starSchema = z.object({
  ra: z.string(),
  dec: z.string(),
  name: z.string().optional(),
  hd: z.string(),
  vmag: z.string(),
  bv: z.string().optional(),
  hex: z.string(),
});

export const lineSchema = z.object({
  ra1: z.string(),
  dec1: z.string(),
  ra2: z.string(),
  dec2: z.string(),
  name: z.string(),
});

export const debugRouter = createTRPCRouter({
  getSpecificPuzzle: publicProcedure
    .input(
      z.object({
        name: z.string(),
        center: z
          .object({
            ra: z.number(),
            dec: z.number(),
          })
          .optional(),
        radius: z.number().optional(),
        rotation: z.number().min(0).max(360),
      })
    )
    .query(async ({ input }) => {
      const { name, center, radius, rotation } = input;
      // check the current path
      const currentPath = process.cwd();
      const rawConstellations = await readCsv(
        path.join(
          currentPath,
          "src/server/api/routers/data/constellations.csv"
        ),
        ",",
        constellationSchema
      );
      const constellations = rawConstellations.map((c) => {
        const ra = Number(c.ra);
        const dec = Number(c.dec);
        const radius = Number(c.radius);
        if (isNaN(ra) || isNaN(dec) || isNaN(radius)) {
          throw new Error("Invalid constellation data\n" + JSON.stringify(c));
        }
        return {
          name: c.name,
          ra,
          dec,
          radius,
        };
      });
      const constellation = constellations.find(
        (c) => c.name.toLowerCase() === name.toLowerCase()
      );
      if (!constellation) {
        throw new Error("Constellation not found");
      }
      const rawStars = await readCsv(
        path.join(currentPath, "src/server/api/routers/data/stars.csv"),
        ",",
        starSchema
      );
      const stars = rawStars.map((star) => {
        const ra = Number(star.ra);
        const dec = Number(star.dec);
        if (isNaN(ra) || isNaN(dec)) {
          throw new Error("Invalid star data\n" + JSON.stringify(star));
        }
        return {
          ra,
          dec,
          vmag: star.vmag,
          hex: star.hex,
          hd: star.hd,
        };
      });
      const constCenter = {
        ra: constellation.ra,
        dec: constellation.dec,
      };
      const inside = coneFilter(
        center ?? constCenter,
        radius ?? constellation.radius,
        (rotation * Math.PI) / 180,
        stars
      );
      const linesRaw = await readCsv(
        path.join(currentPath, "src/server/api/routers/data/lines.csv"),
        ",",
        lineSchema
      );
      const lines = linesRaw.map((line) => {
        const ra1 = Number(line.ra1);
        const dec1 = Number(line.dec1);
        const ra2 = Number(line.ra2);
        const dec2 = Number(line.dec2);
        if (isNaN(ra1) || isNaN(dec1) || isNaN(ra2) || isNaN(dec2)) {
          throw new Error("Invalid line data\n" + JSON.stringify(line));
        }
        const edge1 = skyToXY(center ?? constCenter, rotation * Math.PI/180, {
          ra: ra1,
          dec: dec1,
        });
        const edge2 = skyToXY(center ?? constCenter, rotation * Math.PI/180, {
          ra: ra2,
          dec: dec2,
        });
        return {
          edge1: {
            x: edge1.x,
            y: edge1.y,
          },
          edge2: {
            x: edge2.x,
            y: edge2.y,
          },
          in: line.name === constellation.name,
        };
      });

      return {
        name: constellation.name,
        center: center ?? constCenter,
        stars: inside,
        radius: radius ?? constellation.radius,
        lines: lines,
      };
    }),
  getConstellations: publicProcedure.query(async () => {
    const currentPath = process.cwd();
    const rawConstellations = await readCsv(
      path.join(currentPath, "src/server/api/routers/data/constellations.csv"),
      ",",
      constellationSchema
    );
    const constellations = rawConstellations.map((c) => ({
      name: c.name,
      center: {
        ra: Number(c.ra),
        dec: Number(c.dec),
      },
      radius: Number(c.radius),
    }));
    return constellations;
  }),
});
