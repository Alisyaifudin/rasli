import React, { useState } from 'react';
import Modal from './Atom/Modal';
import IconButton from './Atom/IconButton';
import { AiOutlineClose } from 'react-icons/ai';
import useTranslation from 'next-translate/useTranslation';
import { twMerge } from 'tailwind-merge';
import LanguageOption from './LanguageOption';
import ModeOption from './ModeOption';
import { useAppSelector } from '~/redux/app/hooks';
interface SettingProps {
  open: boolean;
  onClose?: () => void;
}

function Setting({ open, onClose }: SettingProps) {
  const mode = useAppSelector(state=>state.meta.mode)
  const version = useAppSelector(state=>state.meta.version)
  const [mounted, setMounted] = useState(true);
  const { t } = useTranslation('common');
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
        <p className="font-bold text-xl">{t('SETTING_TITLE').toUpperCase()}</p>
        <IconButton onClick={handleClickClose}>
          <AiOutlineClose className="text-red-500" fontSize={20} />
        </IconButton>
      </div>
      <div className="flex items-center justify-evenly p-3 my-2">
        <LanguageOption />
        <ModeOption />
      </div>
      <div className="flex flex-col gap-2 px-5">
        <p>
          {t('SETTING_DESC_1')}
          &nbsp;
          {mode === "comfy" && t('SETTING_DESC_2')}
        </p>
        <p>{t('SETTING_DESC_3')} {version}</p>
      </div>
      <div className="flex justify-evenly items-center h-20">
        <p>{t('FEEDBACK')}</p>
        <a
          href="mailto:muhammad.ali.syaifudin@hotmail.com"
          className="underline"
        >
          {t('EMAIL')}
        </a>
      </div>
      <div className="flex justify-between items-center text-xs p-2">
        <p>© 2022 Muhammad Ali Syaifudin</p>
        <a
          href="https://bit.ly/HadiahTerimaKasih"
          target="_blank"
          className="underline"
        >
          {t('THANKS')}
        </a>
      </div>
    </Modal>
  );
}

export default Setting;
