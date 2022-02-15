import React from "react";
import Navbar from "../Navbar/Navbar";
import Head from "next/head";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAppSelector } from "../../app/hooks";
import { themeSL } from "../../features/meta/metaSlice";
import { LayoutDiv } from './styles';

function Layout({ children }: { children: React.ReactNode }) {
  return (
      <LayoutDiv>
        <Head>
          <title>Rasli</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <div>{children}</div>
      </LayoutDiv>
  );
}

export default Layout;