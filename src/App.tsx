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

import React from 'react';
import { Outlet } from 'react-router-dom';
import { ClientsProvider } from './context/ClientsContext';
import { VATDeregistrationProvider } from './context/VATDeregContext';

const App: React.FC = () => {
  return (
    <ClientsProvider>
      <VATDeregistrationProvider>
        <Outlet />
      </VATDeregistrationProvider>
    </ClientsProvider>
  );
};

export default App;
