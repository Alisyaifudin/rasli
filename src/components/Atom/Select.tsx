import React, { useState, useRef } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useOnClickOutside } from 'usehooks-ts';
import { twMerge } from 'tailwind-merge';
interface SelectProps {
  value: string;
  label: string;
  options: {
    label: string;
    value: string;
  }[];
  onChange: (value: string) => void;
  className?: string;
  classNames?: {
    root?: string;
    selected?: string;
    label?: string;
    icon?: string;
    rootOption?: string;
    containerOption?: string;
    option?: string;
    optionLabel?: string;
  };
}

function Select({
  value,
  label,
  options,
  onChange,
  className,
  classNames,
}: SelectProps) {
  const ref = useRef(null);
  const [scale, setScale] = useState('scale-0');
  const [opacity, setOpacity] = useState('opacity-0');
  const [rotate, setRotate] = useState('rotate-0');

  const animation = () => {
    if (scale === 'scale-0') {
      setScale('scale-1');
      setRotate('rotate-90');
      setOpacity('opacity-1');
    } else {
      setScale('scale-0');
      setRotate('rotate-0');
      setOpacity('opacity-0');
    }
  };
  const handleChange = (value: string) => () => {
    animation();
    onChange(value);
  };
  const handleClick = () => {
    animation();
  };
  const handleClickOutside = () => {
    if (scale === 'scale-1') {
      setScale('scale-0');
      setRotate('rotate-0');
      setOpacity('opacity-0');
    }
  };

  return (
    <div ref={ref} className="relative">
      <div
        className={twMerge(className, classNames?.root)}
        onClick={handleClick}
      >
        <p
          className={twMerge(
            'border-[1px] dark:text-black border-solid border-gray-300 text-white px-3 py-2 rounded-md w-full min-w-[120px] cursor-pointer',
            classNames?.selected,
          )}
        >
          {options.find((option) => option.value === value)?.label}
        </p>
        <span
          className={twMerge(
            'text-gray-400 absolute text-xs -top-2 left-3 dark:text-gray-700 rounded-sm px-2',
            classNames?.label,
          )}
        >
          {label}
        </span>
        <span
          className={twMerge(
            'cursor-pointer absolute right-2 top-3 transition',
            rotate,
            classNames?.icon,
          )}
        >
          <MdKeyboardArrowDown className="text-black dark:text-white" />
        </span>
      </div>
      <div
        className={twMerge(
          'fixed z-[49] left-0 right-0 bottom-0 top-0 bg-transparent',
          scale == 'scale-0' ? 'pointer-events-none' : 'pointer-events-auto',
        )}
        onClick={handleClickOutside}
      ></div>
      <div
        className={twMerge(
          'absolute mt-1 z-50 bg-white flex w-full flex-col transition ease-in-out duration-200 origin-top rounded-lg cursor-pointer border-[1px] border-solid border-gray-500',
          scale,
          opacity,
          classNames?.rootOption,
        )}
      >
        {options?.map((option, i) => (
          <div
            key={option.value}
            className={twMerge(
              'dark:text-white dark:bg-zinc-900 text-black w-full pb-2',
              i === 0 ? 'pt-2' : '',
              classNames?.containerOption,
            )}
          >
            <div
              onClick={handleChange(option.value)}
              className={twMerge(
                'dark:hover:bg-zinc-700 hover:bg-gray-200 w-full px-2 py-1',
                option.value === value
                  ? 'bg-slate-100 dark:bg-zinc-800'
                  : 'dark:bg-zinc-900 bg-white',
                classNames?.option,
              )}
            >
              <label
                className={twMerge(
                  'pointer-events-none',
                  classNames?.optionLabel,
                )}
              >
                {option.label}
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Select;
