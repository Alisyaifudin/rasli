import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import isPropValid from '@emotion/is-prop-valid';

const empty: number[] = Array(6).fill(0);

function Graph() {
  const { t } = useTranslation('common');
  let dist = empty;
  if (typeof window !== 'undefined') {
    const local = localStorage.getItem('dist');
    dist = local ? JSON.parse(local) : empty;
  }
  const total = Math.max(...dist) || 1;
  
  return (
    <div className="w-full flex flex-col my-5 px-10">
      {dist.map((d, i) => (
        <div key={i} className="flex h-8 gap-2 w-full ">
          <div className="flex-1 flex items-center justify-center">
            <p>{i + 1 === 6 ? t('L') : i + 1}</p>
          </div>
          <div className="flex-[30] border-l flex items-center">
            <Bar
              className="flex bg-purple-500 justify-end"
              length={!d ? "15px" : `${Math.floor((d / total) * 100)}%`}
            >
              <p className="text-white px-1">{d}</p>
            </Bar>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Graph;

const expand = (lenngth: string) => {
  return keyframes`
  0% {
    width: 0px;
  }

  100% {
    width: ${lenngth};
  }
`;
};

const Bar = styled('div', {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'length',
})`
  animation: ${(props: { length: string }) => expand(props.length)} 300ms ease
    forwards;
`;
