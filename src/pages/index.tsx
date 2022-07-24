import { trpc } from '../utils/trpc';
import { NextPageWithLayout } from './_app';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import useTranslation from 'next-translate/useTranslation';

const IndexPage: NextPageWithLayout = () => {
  const { t } = useTranslation('common');
  const utils = trpc.useContext();
  const { data } = trpc.useQuery(['post.all']);
  const { theme, setTheme } = useTheme();

  // prefetch all posts for instant navigation
  // useEffect(() => {
  //   for (const { id } of postsQuery.data ?? []) {
  //     utils.prefetchQuery(['post.byId', { id }]);
  //   }
  // }, [postsQuery.data, utils]);

  return (
    <>
      <p>Main</p>
      <button
        aria-label="Toggle Dark Mode"
        type="button"
        className="p-3 order-2 md:order-3"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        Click Me
      </button>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
      <p>HALO</p>
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
