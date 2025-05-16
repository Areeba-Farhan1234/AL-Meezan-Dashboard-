// src/context/ThemeContext.tsx
import { createContext, useState, useMemo, ReactNode } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { getDesignTokens } from '../theme/theme'; // This will return tokens for light/dark mode

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: 'light',
});

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode],
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

// import React, { createContext, useMemo, useState } from 'react';
// import { ThemeProvider, createTheme, CssBaseline, PaletteMode } from '@mui/material';
// import { getDesignTokens } from '../theme/theme';

// interface ColorModeContextType {
//   toggleColorMode: () => void;
//   mode: PaletteMode;
// }

// export const ColorModeContext = createContext<ColorModeContextType>({
//   toggleColorMode: () => {},
//   mode: 'light',
// });

// export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [mode, setMode] = useState<PaletteMode>('light');

//   const toggleColorMode = () => {
//     setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
//   };

//   const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

//   return (
//     <ColorModeContext.Provider value={{ toggleColorMode, mode }}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         {children}
//       </ThemeProvider>
//     </ColorModeContext.Provider>
//   );
// };
