import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "~/components/ui/toaster";
import { store } from "~/store/store";
import { Provider } from "react-redux";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider attribute="class">
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
      <Toaster />
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
