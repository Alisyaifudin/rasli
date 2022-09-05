import React from 'react';
import { useAppSelector } from '~/redux/app/hooks';

const colors = [
  'text-red-500',
  'text-orange-500',
  'text-yellow-500',
  'text-green-500',
];
const emptyPlay = { day: -1, number: 0 };

function AnswerField() {
  const answers = useAppSelector((state) => state.game.answers);
  const empty = Array(5 - answers.length).fill({ name: '', quality: 0 });
  const fields = [...answers, ...empty];
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
