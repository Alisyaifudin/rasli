import { type AppType } from "next/app";
import { api } from "src/utils/api";
import "~/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "src/components/ui/toaster";
import { store } from "src/store/store";
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
