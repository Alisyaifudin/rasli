import { trpc } from '../utils/trpc';
import { NextPageWithLayout } from './_app';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '~/redux/app/hooks';
import Canvas from '~/components/Canvas';
import { setDone, setName } from '~/redux/metaSlice';
import GuessField from '~/components/GuessField';

const IndexPage: NextPageWithLayout = () => {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  const date = useAppSelector((state) => state.meta.date);
  const radius = 20;
  const { data, isSuccess } = trpc.useQuery([
    'constellation.get',
    { r: radius, date },
  ]);
  const { data: names = [''] } = trpc.useQuery(['constellation.name']);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(5).fill(''));
  const [error, setError] = useState('');
  const [input, setInput] = useState('');
  const done = useAppSelector((state) => state.meta.done);
  const mode = useAppSelector((state) => state.meta.mode);
  useEffect(() => {
    if (data && isSuccess) {
      dispatch(setName(data.name));
    }
  }, [isSuccess]);
  // prefetch all posts for instant navigation
  // useEffect(() => {
  //   for (const { id } of postsQuery.data ?? []) {
  //     utils.prefetchQuery(['post.byId', { id }]);
  //   }
  // }, [postsQuery.data, utils]);
  const handleChange = (value: string) => {
    setError('');
    setInput(value);
  };
  const handleSubmit = () => {
    if (index === 4) dispatch(setDone(true));
    else if (index === 5) return;
    else if (answers.includes(input)) {
      setError(t('ALREADY_GUESSED'));
      return;
    } else if (
      !names.map((name) => name.toLowerCase()).includes(input.toLowerCase())
    ) {
      setError(t('NOT_A_CONSTELLATION'));
      return;
    }
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[index] = input;
      return newAnswers;
    });
    setInput('');
    setIndex((prev) => prev + 1);
  };
  return (
    <>
      <div className="max-w-xl m-2 mx-auto bg-zinc-50 dark:bg-zinc-900 flex flex-col items-center rounded-lg p-3 gap-5">
        <Canvas stars={data?.pos} r={radius} />
        <div className="max-w-[200px] w-[100%] mx-auto">
          {answers.map((answer, i) => (
            <div key={i}>
              {answer ? <p>{answer}</p> : <p>&nbsp;</p>}
              <hr className=" dark:border-white/30 border-black/30" />
            </div>
          ))}
        </div>
        <GuessField
          input={input}
          mode={mode}
          done={done}
          onChange={handleChange}
          onSubmit={handleSubmit}
          error={error}
        />
      </div>
    </>
  );
};

export default IndexPage;

/**
 * If you want to statically render this page
 * - Export `appRouter` & `createContext` from [trpc].ts
 * - Make the `opts` object optional on `createContext()`
 *
 * @link https://trpc.io/docs/ssg
 */
// export const getStaticProps = async (
//   context: GetStaticPropsContext<{ filter: string }>,
// ) => {
//   const ssg = createSSGHelpers({
//     router: appRouter,
//     ctx: await createContext(),
//   });
//
//   await ssg.fetchQuery('post.all');
//
//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       filter: context.params?.filter ?? 'all',
//     },
//     revalidate: 1,
//   };
// };
