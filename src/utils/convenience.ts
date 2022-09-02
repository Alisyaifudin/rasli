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

export const skyToXY = (ra: number, dec: number, ra0: number, dec0: number, rotation=0) => {
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
  const y = ((r * 180) / Math.PI) * Math.cos(ang+Math.PI*(1+rotation/180));
  const x = ((r * 180) / Math.PI) * Math.sin(ang+Math.PI*(1+rotation/180));
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
  sizes = sizes.map(size=> size*0.05)
  return Vmag.map((vmag) => interpolate(Vmags, sizes, vmag));
};

