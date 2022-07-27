import React from 'react';
import { useAppDispatch, useAppSelector } from '~/redux/app/hooks';
import { changeMode, ModeType } from '~/redux/metaSlice';
import Select from './Atom/Select';

export default function ModeOption() {
  const mode = useAppSelector((state) => state.meta.mode);
  const dispatch = useAppDispatch();
  const handleChange = (value: string) => {
    if (!['comfy', 'unlimited'].includes(value)) return;
		dispatch(changeMode(value as ModeType));
  };
  const options = [
    { value: 'comfy', label: 'Comfy' },
    { value: 'unlimited', label: 'Unlimited' },
  ];
  return (
    <div className="text-white my-auto">
      <Select
        classNames={{ label: "dark:bg-zinc-800 bg-white dark:text-white/50", selected: "text-black dark:text-white" }}
        label="Mode"
        value={mode}
        options={options}
        onChange={handleChange}
      />
    </div>
  );
}
