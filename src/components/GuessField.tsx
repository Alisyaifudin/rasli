import React, { useEffect, useMemo, useState } from 'react';
import TextField from '~/components/Atom/TextField';
import ButtonOutlined from '~/components/ButtonOutlined';
import {
  ModeType,
  resetError,
  setAnswers,
  setError,
  setName,
  setWin,
} from '~/redux/metaSlice';
import useTranslation from 'next-translate/useTranslation';
import { useAppDispatch, useAppSelector } from '~/redux/app/hooks';
import { trpc } from '~/utils/trpc';

function GuessField() {
  const { t } = useTranslation('common');
  // const [errorMessage, setErrorMessage] = useState('');
  const [input, setInput] = useState('');
  const dispatch = useAppDispatch();
  const done = useAppSelector((state) => state.meta.done);
  const win = useAppSelector((state) => state.meta.win);
  const mode = useAppSelector((state) => state.meta.mode);
  const error = useAppSelector((state) => state.meta.error);
  const answer = useAppSelector((state) => state.meta.name);
  const answers = useAppSelector((state) => state.meta.answers);
  const errorMessage = error ? t(error) : '';

  const mutation = trpc.useMutation(['constellation.answer'], {
    onSuccess: (data) => {
      if (data.correct) dispatch(setWin(true));
      else if (data.answers.length === 5) dispatch(setWin(false));
      if (data.error) dispatch(setError(data.error));
      else setInput('');
      dispatch(setAnswers(data.answers));
      if(data.answer) dispatch(setName(data.answer))
    },
  });

  const handleChange = (value: string) => {
    setInput(value);
    if (errorMessage !== '') dispatch(resetError());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({ guess: input, answer, answers });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <p className="text-sm text-red-500">{errorMessage}</p>
      {done && <p>{win ? t('WON') : t('LOST')}</p>}
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
