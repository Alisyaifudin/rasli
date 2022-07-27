import React, { useState } from 'react';
import Modal from './Atom/Modal';
import IconButton from './Atom/IconButton';
import { AiOutlineClose } from 'react-icons/ai';
import useTranslation from 'next-translate/useTranslation';
import { twMerge } from 'tailwind-merge';
interface SettingProps {
  open: boolean;
  onClose?: () => void;
}

function Setting({ open, onClose }: SettingProps) {
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
      <div>
        <button>Language</button>
        <button>Mode</button>
      </div>
    </Modal>
  );
}

export default Setting;
