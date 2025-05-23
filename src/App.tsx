import React from 'react';
import { Outlet } from 'react-router-dom';
import { ClientsProvider } from './context/ClientsContext';

const App: React.FC = () => {
  return (
    <ClientsProvider>
      <Outlet />
    </ClientsProvider>
  );
};

export default App;

// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import { ClientsProvider } from './context/ClientsContext';
// import useLocalStorageState from 'use-local-storage-state';

// import './index.css';

// const App: React.FC = () => {
//   const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

//   const [theme, setTheme] = useLocalStorageState<'light' | 'dark'>('theme', {
//     defaultValue: defaultDark ? 'dark' : 'light',
//   });

//   const switchTheme = () => {
//     const newTheme = theme === 'light' ? 'dark' : 'light';
//     setTheme(newTheme);
//   };

//   return (
//     <ClientsProvider>
//       <div className="app" data-theme={theme}>
//         <button onClick={switchTheme}>Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode</button>

//         <Outlet />
//       </div>
//     </ClientsProvider>
//   );
// };

// export default App;
