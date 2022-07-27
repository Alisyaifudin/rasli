import React from 'react';
import Button, { ButtonProps } from './Atom/Button';
import { twMerge } from 'tailwind-merge';
function ButtonOutlined({
  children,
  className,
  ...props
}: ButtonProps &
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >) {
  return (
    <Button
      className={twMerge(
        `outline outline-[1px] transition-colors dark:hover:bg-blue-400/10 
          dark:text-blue-300 text-blue-500 outline-blue-300 dark:bg-transparent bg-transparent
          hover:bg-blue-400/10`,
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );
}

export default ButtonOutlined;
