// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { RouterProvider } from 'react-router-dom';
// import { ThemeProvider } from '@emotion/react';
// import { CssBaseline } from '@mui/material';

// import router from 'routes/router';
// import { theme } from 'theme/theme.ts';
// import { ClientsProvider } from './context/ClientsContext';
// import { VatRegProvider } from './context/VATContext';
// import { VatDeregProvider } from './context/VATDeregContext';
// import { RefundProvider } from './context/RefundContext';

// import './index.css';

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <ClientsProvider>
//         <VatRegProvider>
//           <VatDeregProvider>
//             <RefundProvider>
//               <RouterProvider router={router} />
//             </RefundProvider>
//           </VatDeregProvider>
//         </VatRegProvider>
//       </ClientsProvider>
//     </ThemeProvider>
//   </React.StrictMode>,
// );

// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

import router from 'routes/router'; // router uses <App /> as layout
import { theme } from 'theme/theme.ts';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
