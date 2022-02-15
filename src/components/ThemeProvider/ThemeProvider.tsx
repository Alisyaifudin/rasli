import React from "react";
import { useAppSelector } from "../../app/hooks";
import { themeSL } from "../../features/meta/metaSlice";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";

function Provider({ children }: { children: React.ReactNode }) {
  const mode = useAppSelector(themeSL);
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <ScopedCssBaseline enableColorScheme data-testid="css-baseline">{children}</ScopedCssBaseline>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default Provider;
