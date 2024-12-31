import Show from "src/components/control-flow/Show";
import Skeleton from "~/components/aux/Skeleton";
import { api } from "src/utils/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/components/ui/select";
import For from "src/components/control-flow/For";
import { type Region } from "src/pages/debug";
import { Input } from "src/components/ui/input";
import { Checkbox } from "src/components/ui/checkbox";
import { useAppDispatch } from "src/hooks/redux";
import { type CheckedState } from "@radix-ui/react-checkbox";
import { finishGame, reset } from "src/store/metaSlice";

interface TitleProps {
  mounted: boolean;
  onRegionChange: <T extends keyof Region>(key: T, value: Region[T]) => void;
  region: Region;
}

function DebugTitle({ mounted, onRegionChange, region }: TitleProps) {
  const dispatch = useAppDispatch();
  const { name, center, radius, rotation } = region;
  const { isSuccess, data } = api.debug.getConstellations.useQuery();

  const handleChange = (value: string) => {
    if (!data) return;
    const region = data.find((item) => item.name === value);
    if (!region) return;
    onRegionChange("name", region.name);
    onRegionChange("center", region.center);
    onRegionChange("radius", region.radius);
  };
  const handleRA = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    if (e.target.valueAsNumber < 0 || e.target.valueAsNumber > 360) return;
    if (!center) return;
    onRegionChange("center", { ...center, ra: e.target.valueAsNumber });
  };
  const handleDEC = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    if (e.target.valueAsNumber < -90 || e.target.valueAsNumber > 90) return;
    if (!center) return;
    onRegionChange("center", { ...center, dec: e.target.valueAsNumber });
  };
  const handleRadius = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    if (e.target.valueAsNumber < 1 || e.target.valueAsNumber > 180) return;
    onRegionChange("radius", e.target.valueAsNumber);
  };
  const handleRotation = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    if (e.target.valueAsNumber < 0 || e.target.valueAsNumber > 360) return;
    onRegionChange("rotation", e.target.valueAsNumber);
  };
  const handleDone = (e: CheckedState) => {
    if (typeof e !== "boolean") return;
    if (e) dispatch(finishGame({ mode: "unlimited", result: name }));
    else dispatch(reset("unlimited"));
  };
  return (
    <h2 className="text-2xl font-bold">
      <Show
        when={mounted || !isSuccess || !data}
        fallback={
          <Skeleton>
            <div className="h-8 w-32 rounded-lg bg-slate-300 dark:bg-zinc-800" />
          </Skeleton>
        }
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Select onValueChange={handleChange} value={name}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Constellation" />
            </SelectTrigger>
            <SelectContent>
              <For each={data ?? []}>
                {(item) => (
                  <SelectItem key={item.name} value={item.name}>
                    {item.name}
                  </SelectItem>
                )}
              </For>
            </SelectContent>
          </Select>
          <Input
            className="w-fit"
            onChange={handleRA}
            value={center?.ra ? center.ra : ""}
            type="number"
            aria-label="RA"
            placeholder="RA"
            min={0}
            max={360}
          />
          <Input
            className="w-fit"
            onChange={handleDEC}
            value={center?.dec ? center.dec : ""}
            type="number"
            aria-label="DEC"
            placeholder="DEC"
            min={-90}
            max={90}
          />
          <Input
            className="w-fit"
            onChange={handleRadius}
            value={radius ? radius : ""}
            type="number"
            aria-label="radius"
            placeholder="Radius"
            min={1}
            max={180}
          />
          <Input
            className="w-fit"
            onChange={handleRotation}
            value={rotation}
            type="number"
            aria-label="rotation"
            placeholder="Rotation"
            min={0}
            max={360}
          />
          <Checkbox className="h-8 w-8" onCheckedChange={handleDone} />
        </div>
      </Show>
    </h2>
  );
}

export default DebugTitle;
