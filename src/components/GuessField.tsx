import React from 'react';
import TextField from '~/components/Atom/TextField';
import ButtonOutlined from '~/components/ButtonOutlined';
import { ModeType } from '~/redux/metaSlice';
import useTranslation from 'next-translate/useTranslation';

interface GuessFieldProps {
  input: string;
  mode: ModeType;
  done: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
  error: string;
}

function GuessField({
  input,
  mode,
  done,
  onChange,
  onSubmit,
  error,
}: GuessFieldProps) {
  const { t } = useTranslation('common');
  const handleChange = (value: string) => onChange(value);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <p className="text-sm text-red-500">{error}</p>
      <TextField
        className={error === '' ? '' : 'text-red-500'}
        disabled={done}
        onChange={handleChange}
        label={t('TYPE_HERE')}
      >
        {input}
      </TextField>
      <div className="flex gap-2">
        <ButtonOutlined disabled={done} type="submit">
          {t('SUBMIT')}
        </ButtonOutlined>
        {mode === 'unlimited' &&
          (done ? (
            <ButtonOutlined type="button">{t('NEXT')}</ButtonOutlined>
          ) : (
            <ButtonOutlined type="button">{t('SKIP')}</ButtonOutlined>
          ))}
      </div>
    </form>
  );
}

export default GuessField;
