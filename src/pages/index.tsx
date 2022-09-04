import { NextPageWithLayout } from './_app';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '~/redux/app/hooks';
import Canvas from '~/components/Canvas';
import { setDone, setName } from '~/redux/metaSlice';
import GuessField from '~/components/GuessField';
import AnswerField from '~/components/AnswerField';

const IndexPage: NextPageWithLayout = () => {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  
  // prefetch all posts for instant navigation
  // useEffect(() => {
  //   for (const { id } of postsQuery.data ?? []) {
  //     utils.prefetchQuery(['post.byId', { id }]);
  //   }
  // }, [postsQuery.data, utils]);
  
  return (
    <>
      <div className="max-w-xl m-2 mx-auto bg-zinc-50 dark:bg-zinc-900 flex flex-col items-center rounded-lg p-3 gap-5">
        <Canvas/>
        <AnswerField />
        <GuessField />
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
