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
import { NotificationProvider } from './context/Notification';

const App: React.FC = () => {
  return (
    <ClientsProvider>
      <VatRegProvider>
        <VatDeregProvider>
          <RefundProvider>
            <KYCProvider>
              <NotificationProvider>
                <Outlet />
              </NotificationProvider>
            </KYCProvider>
          </RefundProvider>
        </VatDeregProvider>
      </VatRegProvider>
    </ClientsProvider>
  );
};

export default App;

// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [res, setRes] = useState('');

//   const callGetFunction = async () => {
//     const response = await axios.get(
//       'https://us-central1-client-dashboard-bd2cb.cloudfunctions.net/helloWorld',
//     );
//     setRes(response.data);
//   };

//   const callPostFunction = async () => {
//     await axios.post(
//       'https://us-central1-client-dashboard-bd2cb.cloudfunctions.net/submitMessage',
//       {
//         name: 'Areeba',
//         message: 'Hello from frontend!',
//       },
//     );
//     setRes('Message sent!');
//   };

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h1>Firebase Full-Stack Demo</h1>
//       <button onClick={callGetFunction}>Call GET API</button>
//       <button onClick={callPostFunction}>Send POST Message</button>
//       <p>{res}</p>
//     </div>
//   );
// }

// export default App;
