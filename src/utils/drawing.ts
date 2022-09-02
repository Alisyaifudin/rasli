export const circle = (
  ctx: CanvasRenderingContext2D,
  options: {
    x: number;
    y: number;
    radius: number;
    startAngle: number;
    endAngle: number;
    counterclockwise?: boolean;
    color: string | CanvasGradient | CanvasPattern;
  },
) => {
  const { x, y, radius, startAngle, endAngle, counterclockwise, color } =
    options;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, startAngle, endAngle);
  ctx.fill();
};

export const background = (
  ctx: CanvasRenderingContext2D,
  color: string | CanvasGradient | CanvasPattern,
) => {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};
