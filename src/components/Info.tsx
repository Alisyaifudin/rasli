import React, { useState } from 'react';
import Modal from './Atom/Modal';
import IconButton from './Atom/IconButton';
import { AiOutlineClose } from 'react-icons/ai';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import { twMerge } from 'tailwind-merge';
interface InfoProps {
  open: boolean;
  onClose?: () => void;
}

function Info({ open, onClose }: InfoProps) {
  const [mounted, setMounted] = useState(true);
  const { t } = useTranslation('common');
  const lines = Array.from(Array(3).keys()).map((i) => t(`INFO_DESC_${i + 1}`));
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
        <p className="font-bold">{t('INFO_TITLE').toUpperCase()}</p>
        <IconButton onClick={handleClickClose}>
          <AiOutlineClose className="text-red-500" fontSize={20} />
        </IconButton>
      </div>
      <div className="px-3 gap-1 flex flex-col">
        {lines.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
      <hr className="w-[95%] mx-auto my-3 border-white/30" />
      <div className="flex flex-col p-2 gap-5">
        <p className="font-bold">{t('EXAMPLE')}</p>
        <img className="self-center max-w-md w-[100%]" src="UrsaMinor.webp" />
      </div>
      <div className="flex flex-col gap-3 pl-3">
        <div>
          <p className="dark:bg-zinc-900 shadow-md bg-zinc-100 w-fit px-2 py-1 rounded-md text-red-500">
            PUPPIS
          </p>
          <p className="p-1">{t('INFO_TOO_FAR')}</p>
        </div>
        <div>
          <p className="dark:bg-zinc-900 shadow-md bg-zinc-100 w-fit px-2 py-1 rounded-md text-orange-500">
            LEO
          </p>
          <p className="p-1">{t('INFO_FAR')}</p>
        </div>
        <div>
          <p className="dark:bg-zinc-900 shadow-md bg-zinc-100 w-fit px-2 py-1 rounded-md text-yellow-500">
            DRACO
          </p>
          <p className="p-1">{t('INFO_NEAR')}</p>
        </div>
      </div>
      <hr className="w-[95%] mx-auto my-3 border-white/30" />
    </Modal>
  );
}

export default Info;
