import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { useAppSelector } from '~/redux/app/hooks';
import Button from './Atom/Button';
import { BsShare } from 'react-icons/bs';

const empty = {
  day: 0,
  number: 0,
};

function Share() {
  const { t } = useTranslation('common');
  const done = useAppSelector((state) => state.meta.done);
  let stats = empty;
  if (typeof window !== 'undefined') {
    const local = localStorage.getItem('last_played');
    stats = local ? JSON.parse(local) : empty;
  }
  const handleClick = () =>
    navigator.clipboard.writeText(
      `RASLI ${stats.day} ${
        stats.number === 6 ? '❌' : stats.number
      }/5 \nhttps://rasli.vercel.app`,
    );
  return (
    <div className="flex justify-center items-center">
      <Button classNames={{rightIcon: 'pl-2'}} RightIcon={<BsShare />} onClick={handleClick} disabled={!done}>
        {t('SHARE')}
      </Button>
    </div>
  );
}

export default Share;
