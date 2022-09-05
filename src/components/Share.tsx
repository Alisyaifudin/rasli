import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { useAppSelector } from '~/redux/app/hooks';
import Button from './Atom/Button';
import { BsShare } from 'react-icons/bs';


function Share() {
  const { t } = useTranslation('common');
  const done = useAppSelector((state) => state.game.done);
  const last_played = useAppSelector((state) => state.game.last_played);  
  const handleClick = () =>
    navigator.clipboard.writeText(
      `RASLI ${last_played.day} ${
        last_played.number === 6 ? '❌' : last_played.number
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
