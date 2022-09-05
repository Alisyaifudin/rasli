import { NextPageWithLayout } from './_app';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';
import { trpc } from '~/utils/trpc';
import { useAppDispatch, useAppSelector } from '~/redux/app/hooks';
import Canvas, { Star2D } from '~/components/Canvas';
import {
  setAnswers,
  setDay,
  setDist,
  setLastPlayed,
  setName,
  setStats,
  setWin,
} from '~/redux/gameSlice';
import GuessField from '~/components/GuessField';
import AnswerField from '~/components/AnswerField';
import Graph from '~/components/Graph';
import jsonschema from 'jsonschema';
import { gameSchema } from '~/utils/convenience';
import { setReady } from '~/redux/metaSlice';

const empty = {
  stats: {
    played: 0,
    win: 0,
    winrate: 0,
    streak: 0,
    longest_streak: 0,
  },
  last_played: {
    day: -1,
    number: 0,
  },
  dist: Array(6).fill(0) as number[],
  answers: [],
  answer: '',
};
const validator = new jsonschema.Validator();

const dummy = {
  day: -1,
  name: '',
  pos: [
    {
      x: 0,
      y: 0,
      s: 0,
      c: "#000000",
    },
  ] as Star2D[],
};
const IndexPage: NextPageWithLayout = () => {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  const ready = useAppSelector((state) => state.meta.ready);
  const name = useAppSelector((state) => state.game.name);
  const date = useAppSelector((state) => state.game.date);
  const r = 20;
  const { data = dummy } = trpc.useQuery(
    ['constellation.get', { r, date }],
    {
      onSuccess: (data) => {
        if (!name) {
          dispatch(setName(data.name));
          dispatch(setDay(data.day));
        }
        if(ready) return;
        const local = localStorage.getItem('game');
        const game: typeof empty = local ? JSON.parse(local) : empty;
        if (!validator.validate(game, gameSchema).valid)
          localStorage.removeItem('game');
        dispatch(setStats(game.stats));
        dispatch(setLastPlayed(game.last_played));
        dispatch(setDist(game.dist));
        
        if (game.last_played.day !== data.day) {
          dispatch(setReady(true));
          return;
        }
        dispatch(setAnswers(game.answers));
        dispatch(setName(game.answer));
        dispatch(setWin(game.answers.length < 6));
        dispatch(setReady(true));
      },
    },
  );


  return (
    <>
      <div className="max-w-xl m-2 mx-auto bg-zinc-50 dark:bg-zinc-900 flex flex-col items-center rounded-lg p-3 gap-5">
        <Canvas stars={data.pos} r={r} />
        <AnswerField />
        <GuessField />
        <p>UWU</p>
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
