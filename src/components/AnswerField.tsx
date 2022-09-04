import React from 'react';
import { useAppSelector } from '~/redux/app/hooks';

function AnswerField() {
  const answers = useAppSelector((state) => state.meta.answers);
  const empty = Array(5 - answers.length).fill('');
  const fields = [...answers, ...empty];
  return (
    <div className="max-w-[200px] w-[100%] mx-auto">
      {fields.map((answer, i) => (
        <div key={i}>
          {answer ? <p>{answer}</p> : <p>&nbsp;</p>}
          <hr className=" dark:border-white/30 border-black/30" />
        </div>
      ))}
    </div>
  );
}

export default AnswerField;
