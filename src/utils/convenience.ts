export const interpolate = (xs: number[], ys: number[], x: number) => {
  const xmax = Math.max(...xs);
  const xmin = Math.min(...xs);
  const ymax = Math.max(...ys);
  const ymin = Math.min(...ys);
  if (x < xmax && x > xmin) {
    const i = xs.findIndex((x0) => x0 > x);

    const x0 = xs[i - 1] || xmin;
    const x1 = xs[i] || xmax;
    const y0 = ys[i - 1] || ymin;
    const y1 = ys[i] || ymax;
    const result = y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
    return result;
  } else if (x < xmin) {
    return ymin;
  } else {
    return ymax;
  }
};

export const skyToXY = (
  ra: number,
  dec: number,
  ra0: number,
  dec0: number,
  rotation = 0,
) => {
  // console.log(ra, dec)
  const r = Math.acos(
    Math.sin((dec0 * Math.PI) / 180) * Math.sin((dec * Math.PI) / 180) +
      Math.cos((dec0 * Math.PI) / 180) *
        Math.cos((dec * Math.PI) / 180) *
        Math.cos(((ra - ra0) * Math.PI) / 180),
  );

  const ang = Math.atan2(
    Math.sin(((ra - ra0) * Math.PI) / 180),
    Math.cos((dec0 * Math.PI) / 180) * Math.tan((dec * Math.PI) / 180) -
      Math.sin((dec0 * Math.PI) / 180) * Math.cos(((ra - ra0) * Math.PI) / 180),
  );
  const y =
    ((r * 180) / Math.PI) * Math.cos(ang + Math.PI * (1 + rotation / 180));
  const x =
    ((r * 180) / Math.PI) * Math.sin(ang + Math.PI * (1 + rotation / 180));
  return { x, y };
};

export type Star = {
  ra: number;
  dec: number;
  bv: number;
  Vmag: number;
};
/**
 * angle in deg
 */
export const filterStars = (
  stars: Star[],
  ra0: number,
  dec0: number,
  r: number,
) => {
  return stars.filter((star) => {
    const { ra, dec } = star;
    const rr = Math.acos(
      Math.sin((dec0 * Math.PI) / 180) * Math.sin((dec * Math.PI) / 180) +
        Math.cos((dec0 * Math.PI) / 180) *
          Math.cos((dec * Math.PI) / 180) *
          Math.cos(((ra - ra0) * Math.PI) / 180),
    );
    return (r * Math.PI) / 180 > rr;
  });
};

export type ColorFile = {
  bv: number;
  T: number;
  hex: string;
  des: number;
  r: number;
  g: number;
  b: number;
};

export const bvToRGB = (bv: number[], arr: ColorFile[]) => {
  const bvs = arr.map(({ bv }) => Number(bv));
  const rs = arr.map(({ r }) => Number(r));
  const gs = arr.map(({ g }) => Number(g));
  const bs = arr.map(({ b }) => Number(b));
  const color = bv.map((b_v) => {
    const r = interpolate(bvs, rs, b_v);
    const g = interpolate(bvs, gs, b_v);
    const b = interpolate(bvs, bs, b_v);
    return rgbToHex(r, g, b);
  });
  return color;
};

// convert rgb to hex
const rgbToHex = (r: number, g: number, b: number) => {
  const hex = ((r << 16) | (g << 8) | b).toString(16);
  return '#' + new Array(Math.abs(hex.length - 7)).join('0') + hex;
};

export const vmagToSize = (Vmag: number[]) => {
  const Vmags = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8];
  let sizes = [10, 5, 4, 3, 2, 1, 0.5, 0.3, 0.2, 0.1];
  sizes = sizes.map((size) => size * 0.05);
  return Vmag.map((vmag) => interpolate(Vmags, sizes, vmag));
};
// given two stars coordinate, find their distance in degree
type coordinate = {
  RA: number;
  DEC: number;
};
export const distance = (star1: coordinate, star2: coordinate) => {
  const { RA: ra1, DEC: dec1 } = star1;
  const { RA: ra2, DEC: dec2 } = star2;
  const rr = Math.acos(
    Math.sin((dec1 * Math.PI) / 180) * Math.sin((dec2 * Math.PI) / 180) +
      Math.cos((dec1 * Math.PI) / 180) *
        Math.cos((dec2 * Math.PI) / 180) *
        Math.cos(((ra1 - ra2) * Math.PI) / 180),
  );
  return (rr * 180) / Math.PI;
};
//interval between two dates
export const intervalDate = (date1: Date, date2: Date) => {
  const diff = Math.abs(date1.getTime() - date2.getTime());
  return Math.floor(diff / (1000 * 3600 * 24));
};
export const gameSchema = {
  type: 'object',
  properties: {
    stats: {
      type: 'object',
      properties: {
        played: {
          type: 'number',
        },
        win: {
          type: 'number',
        },
        winrate: {
          type: 'number',
        },
        streak: {
          type: 'number',
        },
        longest_streak: {
          type: 'number',
        },
      },
      required: ['played', 'win', 'winrate', 'streak', 'longest_streak'],
    },
    last_played: {
      type: 'object',
      properties: {
        day: {
          type: 'number',
        },
        number: {
          type: 'number',
        },
      },
      required: ['day', 'number'],
    },
    dist: {
      type: 'array',
      items: {
        type: 'number',
      },
    },
    answers: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          quality: {
            type: 'number',
          },
        },
        required: ['name', 'quality'],
      },
    },
    answer: {
      type: 'string',
    },
  },
  required: ['stats', 'last_played', 'dist', 'answers', 'answer'],
};

type statsType = {
  played: number;
  win: number;
  winrate: number;
  streak: number;
  longest_streak: number;
};
type last_playedType = {
  day: number;
  number: number;
};
type answersType = {
  name: string;
  quality: number;
}[];

// export const gg = (win: boolean, answers: {name: string, quality: number}[], answer: string) => {
interface ggType {
  stats: statsType;
  last_played: last_playedType;
  dist: number[];
  answers: answersType;
  answer: string;
  win: boolean;
  day: number;
}

export const gg = ({
  stats,
  last_played,
  dist,
  answer,
  answers,
  win,
  day,
}: ggType) => {
  const newGame = {
    stats: {
      played: stats.played + 1,
      win: win ? stats.win + 1 : stats.win,
      winrate: win
        ? (stats.win + 1) / (stats.played + 1)
        : stats.win / (stats.played + 1),
      streak: win ? (last_played.number < 6 ? stats.streak + 1 : 1) : 0,
      longest_streak:
        win && last_played.number < 6
          ? Math.max(stats.streak + 1, stats.longest_streak)
          : stats.longest_streak,
    },
    last_played: {
      day,
      number: win ? answers.length : 6,
    },
    dist: dist.map((d, i) =>
      i === (win ? answers.length - 1 : 5) ? d + 1 : d,
    ),
    answers,
    answer,
  };
  localStorage.setItem('game', JSON.stringify(newGame));
  return newGame;
};
