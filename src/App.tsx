// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import { ClientsProvider } from './context/ClientsContext';

// const App: React.FC = () => {
//   return (
//     <ClientsProvider>
//       <Outlet />
//     </ClientsProvider>
//   );
// };

// export default App;

// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import { ClientsProvider } from './context/ClientsContext';
// import { VATDeregistrationProvider } from './context/VATDeregContext';

// const App: React.FC = () => {
//   return (
//     <ClientsProvider>
//       <VATDeregistrationProvider>
//         <Outlet />
//       </VATDeregistrationProvider>
//     </ClientsProvider>
//   );
// };

// export default App;
import React from 'react';
import { Outlet } from 'react-router-dom';
// import { ClientsProvider } from './context/VATContext';
import { VatDeregProvider } from './context/VATDeregContext';
import { RefundProvider } from './context/RefundContext';

const App: React.FC = () => {
  return (
    <VatDeregProvider>
      <RefundProvider>
        <Outlet />
      </RefundProvider>
    </VatDeregProvider>
  );
};

export default App;
