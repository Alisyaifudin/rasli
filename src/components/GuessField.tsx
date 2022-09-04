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

const emptyDist: number[] = Array(6).fill(0);
const emptyStats = {
  played: 0,
  win: 0,
  winrate: 0,
  streak: 0,
  longest_streak: 0,
};
const emptyPlay = { day: 0, number: 0 };

function GuessField() {
  const { t } = useTranslation('common');
  // const [errorMessage, setErrorMessage] = useState('');
  const [input, setInput] = useState('');
  const dispatch = useAppDispatch();
  const done = useAppSelector((state) => state.meta.done);
  const win = useAppSelector((state) => state.meta.win);
  const mode = useAppSelector((state) => state.meta.mode);
  const error = useAppSelector((state) => state.meta.error);
  const day = useAppSelector((state) => state.meta.day);
  const answer = useAppSelector((state) => state.meta.name);
  const answers = useAppSelector((state) => state.meta.answers);
  const errorMessage = error ? t(error) : '';
  let dist = emptyDist;
  let stats = emptyStats;
  let lastPlayed = emptyPlay;
  if (typeof window !== 'undefined') {
    const localDist = localStorage.getItem('dist');
    dist = localDist ? JSON.parse(localDist) : emptyDist;
    const localStats = localStorage.getItem('stats');
    stats = localStats ? JSON.parse(localStats) : emptyStats;
    const localPlay = localStorage.getItem('last_played');
    lastPlayed = localPlay ? JSON.parse(localPlay) : emptyPlay;
  }
  const gg = (win: boolean, answers: {name: string, quality: number}[], answer: string) => {
    const newLastPlayed = { day, number: win ? answers.length : 6 };
    localStorage.setItem('last_played', JSON.stringify(newLastPlayed));
    const newDist = dist.map((d, i) =>
      i === newLastPlayed.number - 1 ? d + 1 : d,
    );
    localStorage.setItem('dist', JSON.stringify(newDist));
    const newStats = {
      played: stats.played + 1,
      win: stats.win + (win ? 1 : 0),
      winrate: Math.floor(
        ((stats.win + (win ? 1 : 0)) / (stats.played + 1)) * 100,
      ),
      streak: win ? (lastPlayed.number < 6 ? stats.streak + 1 : 1) : 0,
      longest_streak:
        win && lastPlayed.number < 6
          ? Math.max(stats.streak + 1, stats.longest_streak)
          : stats.longest_streak,
    };
    localStorage.setItem('stats', JSON.stringify(newStats));
    localStorage.setItem('answers', JSON.stringify(answers));
    localStorage.setItem('answer', JSON.stringify(answer));
  };
  const mutation = trpc.useMutation(['constellation.answer'], {
    onSuccess: (data) => {
      if (data.correct && data.answer) {
        dispatch(setWin(true));
        gg(true, data.answers, data.answer);
      } else if (data.answers.length === 5 && data.answer) {
        dispatch(setWin(false));
        gg(false, data.answers, data.answer);
      }
      if (data.error) dispatch(setError(data.error));
      else setInput('');
      dispatch(setAnswers(data.answers));
      if (data.answer) dispatch(setName(data.answer));
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
