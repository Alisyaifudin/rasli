import React, { useEffect, useMemo, useState } from 'react';
import TextField from '~/components/Atom/TextField';
import ButtonOutlined from '~/components/ButtonOutlined';
import {
  ModeType,
  resetError,
  setAnswers,
  setDist,
  setError,
  setLastPlayed,
  setName,
  setStats,
  setWin,
} from '~/redux/gameSlice';
import useTranslation from 'next-translate/useTranslation';
import { useAppDispatch, useAppSelector } from '~/redux/app/hooks';
import { trpc } from '~/utils/trpc';
import { gg } from '~/utils/convenience';

function GuessField() {
  const { t } = useTranslation('common');
  // const [errorMessage, setErrorMessage] = useState('');
  const [input, setInput] = useState('');
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.meta.mode);
  const done = useAppSelector((state) => state.game.done);
  const win = useAppSelector((state) => state.game.win);
  const error = useAppSelector((state) => state.game.error);
  const day = useAppSelector((state) => state.game.day);
  const stats = useAppSelector((state) => state.game.stats);
  const dist = useAppSelector((state) => state.game.dist);
  const last_played = useAppSelector((state) => state.game.last_played);
  const answer = useAppSelector((state) => state.game.name);
  const answers = useAppSelector((state) => state.game.answers);
  const errorMessage = error ? t(error) : '';

  const mutation = trpc.useMutation(['constellation.answer'], {
    onSuccess: (data) => {
      if (data.answer) {
        if (data.correct) dispatch(setWin(true));
        else dispatch(setWin(false));
        dispatch(setName(data.answer));
        const newGame = gg({
          stats,
          dist,
          last_played,
          day,
          answers: data.answers,
          answer: data.answer,
          win: data.correct,
        });
        dispatch(setStats(newGame.stats));
        dispatch(setDist(newGame.dist));
        dispatch(setLastPlayed(newGame.last_played));
        dispatch(setName(newGame.answer));
      }
      if (data.error) dispatch(setError(data.error));
      else setInput('');
      dispatch(setAnswers(data.answers));
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center">
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
        <ButtonOutlined disabled={done || !input || !!error} type="submit">
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
