import React from "react";
import { type Mode } from "src/store/metaSlice";
import Show from "src/components/control-flow/Show";
import Skeleton from "~/components/aux/Skeleton";
import For from "src/components/control-flow/For";
import { useAppSelector } from "src/hooks/redux";
import { cn } from "src/utils/cn";

interface GuessProps {
  mounted: boolean;
  mode: Mode;
}

function Guess({ mounted, mode }: GuessProps) {
  const answers = useAppSelector((state) => state.meta[mode].answers);
  return (
    <div className="mx-auto w-[100%] max-w-[200px]">
      <ul>
        <For each={answers} fallback={<div>Something went wrong...</div>}>
          {(answer, i) => (
            <li
              key={i}
              className="flex h-8 items-end justify-center border-b border-b-slate-400 pb-1 dark:border-b-zinc-600"
            >
              <Show
                when={mounted}
                fallback={
                  <Skeleton>
                    <div className="h-4 w-3/4 rounded-sm bg-slate-300 dark:bg-zinc-800" />
                  </Skeleton>
                }
              >
                <p
                  className={cn(
                    !!answer.name
                      ? "rounded-md px-1 font-bold text-white shadow-sm"
                      : null,
                    answer.closeness === -1
                      ? "text-green-500"
                      : answer.closeness < 3
                      ? "level-3"
                      : answer.closeness < 5
                      ? "level-2"
                      : "level-1"
                  )}
                >
                  {answer.name}
                </p>
              </Show>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}

export default Guess;
