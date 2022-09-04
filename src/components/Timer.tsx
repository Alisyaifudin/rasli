import useTranslation from 'next-translate/useTranslation';
import React, { useEffect, useState } from 'react';

let tt = new Date();
tt.setHours(24, 0, 0, 0);

function Timer() {
  const date = new Date();
  const interval = tt.getTime() - date.getTime();
  const [time, setTime] = useState(
    new Date(interval).toISOString().substring(11, 19),
  );
  const { t } = useTranslation('common');
  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      const interval = tt.getTime() - date.getTime();
      setTime(new Date(interval).toISOString().substring(11, 19));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="flex flex-col justify-center items-center">
      <p>{t('NEXT_RASLI').toUpperCase()}</p>
      <p className="text-5xl">{time}</p>
    </div>
  );
}

export default Timer;
