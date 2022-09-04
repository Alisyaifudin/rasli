import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '~/redux/app/hooks';
import { setAnswers, setName, setWin } from '~/redux/metaSlice';

const colors = [
  'text-red-500',
  'text-orange-500',
  'text-yellow-500',
  'text-green-500',
];
const emptyPlay = { day: -1, number: 0 };

function AnswerField() {
  const answers = useAppSelector((state) => state.meta.answers);
  const dispatch = useAppDispatch();
  const day = useAppSelector((state) => state.meta.day);
  const empty = Array(5 - answers.length).fill({ name: '', quality: 0 });
  const fields = [...answers, ...empty];
  useEffect(() => {
    const local = localStorage.getItem('answers');
    const ans: { name: string; quality: number }[] = local
      ? JSON.parse(local)
      : [];
    const localPlay = localStorage.getItem('last_played');
    const localAns = localStorage.getItem('answer');
    const answer = localAns ? JSON.parse(localAns) : '';
    const lastPlayed: { day: number; number: number } = localPlay
      ? JSON.parse(localPlay)
      : emptyPlay;
    if (lastPlayed.day === day) {
      dispatch(setWin(lastPlayed.number < 6));
      dispatch(setAnswers(ans));
      dispatch(setName(answer));
    }
  }, []);
  return (
    <div className="max-w-[200px] w-[100%] mx-auto">
      {fields.map((answer, i) => (
        <div key={i}>
          {answer.name ? (
            <p className={colors[answer.quality]}>{answer.name}</p>
          ) : (
            <p>&nbsp;</p>
          )}
          <hr className=" dark:border-white/30 border-black/30" />
        </div>
      ))}
    </div>
  );
}

export default AnswerField;
