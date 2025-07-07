// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import { ClientsProvider } from './context/ClientsContext';
// import { VatRegProvider } from './context/VATContext';
// import { VatDeregProvider } from './context/VATDeregContext';
// import { RefundProvider } from './context/RefundContext';

// const App: React.FC = () => {
//   return (
//     <ClientsProvider>
//       <VatRegProvider>
//         <VatDeregProvider>
//           <RefundProvider>
//             <Outlet />
//           </RefundProvider>
//         </VatDeregProvider>
//       </VatRegProvider>
//     </ClientsProvider>
//   );
// };

// export default App;

// App.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { ClientsProvider } from './context/ClientsContext';
import { VatRegProvider } from './context/VATContext';
import { VatDeregProvider } from './context/VATDeregContext';
import { RefundProvider } from './context/RefundContext';
import { KYCProvider } from 'context/KycContext';

const App: React.FC = () => {
  return (
    <ClientsProvider>
      <VatRegProvider>
        <VatDeregProvider>
          <RefundProvider>
            <KYCProvider>
              <Outlet />
            </KYCProvider>
          </RefundProvider>
        </VatDeregProvider>
      </VatRegProvider>
    </ClientsProvider>
  );
};

export default App;
