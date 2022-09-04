import React, { useState } from 'react';
import Modal from './Atom/Modal';
import IconButton from './Atom/IconButton';
import { AiOutlineClose } from 'react-icons/ai';
import useTranslation from 'next-translate/useTranslation';
import { twMerge } from 'tailwind-merge';
import Graph from '~/components/Graph';
import Timer from './Timer';
interface StatisticsProps {
  open: boolean;
  onClose?: () => void;
}

const empty = { played: 0, win: 0, winrate: 0, streak: 0, longest_streak: 0 };

function Statistics({ open, onClose }: StatisticsProps) {
  const [mounted, setMounted] = useState(true);
  const { t } = useTranslation('common');
  let stats = empty;
  if (typeof window !== 'undefined') {
    const local = localStorage.getItem('stats');
    stats = local ? JSON.parse(local) : empty;
  }
  const handleClickClose = () => {
    setMounted(false);
    setTimeout(() => {
      onClose?.();
      setMounted(true);
    }, 200);
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      className="px-3 pb-5"
      classNames={{
        portal: mounted
          ? ''
          : twMerge(
              mounted ? 'opacity-100' : 'opacity-0 pointer-events-none',
              'transition-opacity',
            ),
      }}
    >
      <div className="flex justify-between items-center px-3 pt-3">
        <p className="font-bold">{t('STATISTICS_TITLE').toUpperCase()}</p>
        <IconButton onClick={handleClickClose}>
          <AiOutlineClose className="text-red-500" fontSize={20} />
        </IconButton>
      </div>

      <div className="grid grid-rows-2 grid-cols-4 justify-center items-center">
        <p className="text-center text-3xl">{stats.played}</p>
        <p className="text-center text-3xl">{stats.winrate}</p>
        <p className="text-center text-3xl">{stats.streak}</p>
        <p className="text-center text-3xl ">{stats.longest_streak}</p>
        <p className="text-center">{t('PLAYED')}</p>
        <p className="text-center">{t('WIN')}</p>
        <p className="text-center">{t('CURRENT_STREAK')}</p>
        <p className="text-center">{t('LONGEST_STREAK')}</p>
      </div>
      <p className="font-bold">{t('GUESS_DISTRIBUTION').toUpperCase()}</p>
      <Graph />
      {/* <div className='w-5 h-7 bg-green-500 mt-5'></div> */}
      <div className='flex justify-around'>
        <Timer/>
        <div className='border dark:border-white/10 bg-black/10'/>
        <p>HELOOO</p>
      </div>
    </Modal>
  );
}

export default Statistics;
