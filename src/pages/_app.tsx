import "../styles/globals.css";
import React from "react";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import ThemeProvider from "../components/ThemeProvider/ThemeProvider";
import store from "../app/store";
import Layout from "../components/Layout/Layout";

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<React.StrictMode>
				<Provider store={store}>
					<ThemeProvider>
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</ThemeProvider>
				</Provider>
		</React.StrictMode>
	);
}
