// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import router from 'routes/router';
// import { RouterProvider } from 'react-router-dom';
// import { ThemeProvider } from '@emotion/react';
// import { CssBaseline } from '@mui/material';
// import { theme } from 'theme/theme.ts';
// import './index.css';

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <RouterProvider router={router} />
//     </ThemeProvider>
//   </React.StrictMode>,
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

import router from 'routes/router';
import { theme } from 'theme/theme.ts';
import { ClientsProvider } from './context/ClientsContext';
import { VatDeregProvider } from './context/VATDeregContext';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ClientsProvider>
        <VatDeregProvider>
          <RouterProvider router={router} />
        </VatDeregProvider>
      </ClientsProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
