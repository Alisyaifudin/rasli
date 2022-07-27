import React, { useId, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import styled from '@emotion/styled';

interface TextFieldProps {
  children?: string;
  onChange?: (e: string) => void;
  label?: string;
}

function TextField({ children, onChange, label }: TextFieldProps) {
  const id = useId();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.target.value);
  };

  return (
    <Parent className="relative h-14 dark:bg-zinc-700 rounded-t-sm flex flex-col justify-end border-b-white border-b-[1px]">
      <Input
        id={id}
        type="text"
        className="px-3 h-10 bg-inherit"
        onChange={handleChange}
        value={children}
      />
      <label
        className={twMerge(
          'bottom-3 left-3 pointer-events-none select-none absolute dark:text-white/50 ',
          children
            ? 'text-[0.8rem] origin-left translate-y-[-20px]'
            : 'transition-[font-size_transform] ease-in-out duration-200',
        )}
        htmlFor={id}
      >
        {label}
      </label>
    </Parent>
  );
}

export default TextField;

const Input = styled('input')`
  :focus {
    outline: none;
  }
  :focus + label {
    transform-origin: left;
    transform: translateY(-20px);
    font-size: 0.8rem;
    color: rgb(144, 202, 249);
  }
`;

const Parent = styled('div')`
  > input:focus {
    border-bottom: 1px #90caf9 solid;
  }
`;
