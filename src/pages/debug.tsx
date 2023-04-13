import { type NextPage } from "next";
import { useAppSelector } from "~/hooks/redux";
import DebugTitle from "~/components/debug/DebugTitle";
import DebugPuzzle from "~/components/debug/DebugPuzzle";
import Guess from "~/components/Guess";
import Answer from "~/components/Answer";
import DebugLayout from "~/layouts/DebugLayout";
import { useState } from "react";

export type Region = {
  name: string;
  center?: {
    ra: number;
    dec: number;
  };
  radius?: number;
  rotation: number;
};

const Home: NextPage = () => {
  const mounted = useAppSelector((state) => state.meta.mounted);
  const [region, setRegion] = useState<Region>({
    name: "Andromeda",
    center: undefined,
    radius: undefined,
    rotation: 0,
  });
  const handleRegion = <T extends keyof Region>(key: T, value: Region[T]) => {
    setRegion((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <DebugLayout>
      <div className="m-2 mx-auto flex max-w-4xl flex-col items-center gap-5 rounded-lg bg-zinc-50 p-3 py-4 dark:bg-zinc-900">
        <DebugTitle
          mounted={mounted}
          onRegionChange={handleRegion}
          region={region}
        />
        <DebugPuzzle
          mounted={mounted}
          onRegionChange={handleRegion}
          region={region}
        />
        <Answer mode="unlimited" mounted={mounted} />
        <Guess mode="unlimited" mounted={mounted} />
      </div>
    </DebugLayout>
  );
};

export default Home;
