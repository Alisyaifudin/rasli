import { trpc } from '../utils/trpc';
import { NextPageWithLayout } from './_app';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import TextField from '~/components/TextField';

const IndexPage: NextPageWithLayout = () => {
  const { t } = useTranslation('common');
  const utils = trpc.useContext();
  const { data } = trpc.useQuery(['post.all']);
  const { theme, setTheme } = useTheme();
  const [answers, setAnswers] = useState<string[]>(Array(5).fill(''));
  const [input, setInput] = useState('');
  // prefetch all posts for instant navigation
  // useEffect(() => {
  //   for (const { id } of postsQuery.data ?? []) {
  //     utils.prefetchQuery(['post.byId', { id }]);
  //   }
  // }, [postsQuery.data, utils]);
  const handleChange = (value: string) => setInput(value);
  return (
    <>
      <button
        aria-label="Toggle Dark Mode"
        type="button"
        className="p-3 order-2 md:order-3"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        Click Me
      </button>
      <div className="max-w-xl mx-auto dark:bg-zinc-800 flex flex-col items-center rounded-lg p-3 gap-5">
        <img src="testing.webp" className="max-w-lg" />
        <div className="max-w-[200px] w-[100%] mx-auto">
          {answers.map((answer, i) => (
            <div key={i}>
              <p>&nbsp;</p>
              <hr className=" dark:border-white/30 border-black/30" />
            </div>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log('UWU');
          }}
          className="flex flex-col items-center"
        >
          <TextField onChange={handleChange} label="Ketik Di Sini">{input}</TextField>
          <button type="submit">Submit</button>
        </form>
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
