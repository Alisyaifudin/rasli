import { trpc } from '../utils/trpc';
import { NextPageWithLayout } from './_app';
import { useTheme } from 'next-themes';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import TextField from '~/components/Atom/TextField';
import Button from '~/components/Atom/Button';
import LanguageOption from '~/components/LanguageOption';
import ButtonOutlined from '~/components/ButtonOutlined';
import { useAppSelector } from '~/redux/app/hooks';

const IndexPage: NextPageWithLayout = () => {
  const { t } = useTranslation('common');
  const utils = trpc.useContext();
  const { data } = trpc.useQuery(['post.all']);
  const { theme, setTheme } = useTheme();
  const [answers, setAnswers] = useState<string[]>(Array(5).fill(''));
  const [input, setInput] = useState('');
  const done = useAppSelector((state) => state.meta.done);
  const mode = useAppSelector((state) => state.meta.mode);
  // prefetch all posts for instant navigation
  // useEffect(() => {
  //   for (const { id } of postsQuery.data ?? []) {
  //     utils.prefetchQuery(['post.byId', { id }]);
  //   }
  // }, [postsQuery.data, utils]);
  const handleChange = (value: string) => setInput(value);
  return (
    <>
      <div className="max-w-xl m-2 mx-auto bg-zinc-50 dark:bg-zinc-900 flex flex-col items-center rounded-lg p-3 gap-5">
        <img src="testing.webp" className="max-w-lg w-[100%]" />
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
          <TextField onChange={handleChange} label={t('TYPE_HERE')}>
            {input}
          </TextField>
          <div className="flex gap-2">
            <ButtonOutlined type="submit">{t('SUBMIT')}</ButtonOutlined>
            {mode === 'unlimited' &&
              (done ? (
                <ButtonOutlined type="button">{t('NEXT')}</ButtonOutlined>
              ) : (
                <ButtonOutlined type="button">{t('SKIP')}</ButtonOutlined>
              ))}
          </div>
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
