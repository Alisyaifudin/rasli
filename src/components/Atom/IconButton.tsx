import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  classNames?: {
    button?: string;
    ripple?: string;
    children?: string;
    leftIcon?: string;
    rightIcon?: string;
  };
  LeftIcon?: React.ReactNode;
  RightIcon?: React.ReactNode;
}

function Button({
  children,
  onClick,
  type,
  classNames,
  className,
  disabled,
}: ButtonProps &
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >) {
  const [coords, setCoords] = React.useState<{
    x: string | number;
    y: string | number;
  }>({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = React.useState(false);

  React.useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 500);
    } else setIsRippling(false);
  }, [coords]);

  React.useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 });
  }, [isRippling]);

  return (
    <button
      disabled={disabled}
      type={type}
      className={twMerge(
        `disabled:cursor-not-allowed disabled:bg-gray-300 
				 disabled:text-gray-400`,
        `disabled:dark:border-gray-600 disabled:dark:bg-gray-600
				disabled:dark:text-gray-800`,
        `w-auto h-auto rounded-full p-2 bg-transparent border-none hover:bg-slate-400/20
				overflow-hidden relative cursor-pointer justify-center flex items-center`,
        `dark:bg-transparent hover:dark:bg-slate-400/20`,
        classNames?.button,
        className,
      )}
      onClick={(e) => {
        setCoords({ x: '25%', y: '25%' });
        if (onClick) onClick();
      }}
    >
      {isRippling ? (
        <Ripling
          className={twMerge(
            "w-5 h-5 absolute bg-slate-200 block content-[''] rounded-full opacity-100",
            classNames?.ripple,
          )}
          style={{
            left: coords.x,
            top: coords.y,
          }}
        />
      ) : (
        ''
      )}
      <span
        className={twMerge(
          'relative z-[2] text-center text-md',
          classNames?.children,
        )}
      >
        {children}
      </span>
    </button>
  );
}

export default Button;

const ripple = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(10);
    opacity: 0.375;
  }
  100% {
    transform: scale(35);
    opacity: 0;
  }
`;

const Ripling = styled('span')`
  animation: 1.5s ease 1 forwards ${ripple};
`;
