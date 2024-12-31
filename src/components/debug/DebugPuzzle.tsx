import Show from "src/components/control-flow/Show";
import Skeleton from "~/components/aux/Skeleton";
import { addPuzzle } from "src/store/metaSlice";
import { api } from "src/utils/api";
import { useEffect, useRef } from "react";
import { draw } from "src/utils/draw";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { type Region } from "src/pages/debug";

interface PuzzleProps {
  mounted: boolean;
  region: Region;
  onRegionChange: <T extends keyof Region>(key: T, value: Region[T]) => void;
}
function Puzzle({ mounted, region, onRegionChange }: PuzzleProps) {
  const dispatch = useAppDispatch();
  const done = useAppSelector((state) => state.meta.unlimited.done);
  const { center, name, radius, rotation } = region;

  const getPuzzle = api.debug.getSpecificPuzzle.useQuery(
    {
      name,
      center,
      radius,
      rotation,
    },
    {
      onSuccess: (data) => {
        if (data.name === null) return;
        dispatch(addPuzzle({ puzzle: data.name, mode: "unlimited" }));
        onRegionChange("name", data.name);
        onRegionChange("center", data.center);
        onRegionChange("radius", data.radius);
      },
    }
  );

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (!canvasRef.current || !mounted) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;
    if (!getPuzzle?.data) return;
    const stars = getPuzzle.data.stars;
    const radius = getPuzzle.data.radius;
    const lines = done ? getPuzzle.data.lines : [];
    //Our draw come here
    draw(context, stars, radius, lines);
  }, [canvasRef, getPuzzle, done, mounted]);

  return (
    <>
      <div className="flex aspect-square w-full xs:w-[50%] ">
        <Show
          when={mounted}
          fallback={
            <Skeleton>
              <div className="h-full w-full rounded-full bg-slate-300 dark:bg-zinc-800" />
            </Skeleton>
          }
        >
          <canvas
            className="block w-full rounded-full"
            width="300"
            height="300"
            ref={canvasRef}
            id="canvas"
          ></canvas>
        </Show>
      </div>
    </>
  );
}

export default Puzzle;
