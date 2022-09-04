import React, { useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '~/redux/app/hooks';
import { setName } from '~/redux/metaSlice';
import { background, circle } from '~/utils/drawing';
import { trpc } from '~/utils/trpc';
export type Star2D = {
  x: number;
  y: number;
  s: number;
  c: string;
};


function Canvas() {
  const date = useAppSelector((state) => state.meta.date);
  const dispatch = useAppDispatch();
  const r = 20;
  const { data, isSuccess } = trpc.useQuery([
    'constellation.get',
    { r, date },
  ]);
  const [mounted, setMounted] = React.useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const draw = (ctx: CanvasRenderingContext2D) => {
    const stars =  data?.pos
    background(ctx, '#000');
    if (!stars) return;
    for (const star of stars) {
      let options = {
        x: ((1 + star.x / r) * ctx.canvas.width) / 2,
        y: ((1 + star.y / r) * ctx.canvas.height) / 2,
        radius: ((star.s / r) * ctx.canvas.height) / 2,
        startAngle: 0,
        endAngle: 2 * Math.PI,
        counterclockwise: false,
        color: star.c,
      };
      circle(ctx, options);
      options.radius = options.radius * 0.5;
      options.color = '#fff';
      circle(ctx, options);
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const c = canvasRef.current;
    c.width = c.parentElement!.clientWidth;
    c.height = c.parentElement!.clientHeight;
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !mounted) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    //Our draw come here
    draw(context);
  }, [draw, mounted]);

  useEffect(() => {
    if (data && isSuccess) {
      dispatch(setName(data.name));
    }
  }, [isSuccess]);
  return (
    <div className="block w-full aspect-square">
      <canvas
        // className='w-full h-auto'
        className="h-full rounded-full"
        ref={canvasRef}
        id="canvas"
      ></canvas>
    </div>
  );
}

export default Canvas;
