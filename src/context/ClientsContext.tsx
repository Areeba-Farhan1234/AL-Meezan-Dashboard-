// import React, { createContext, useState, useContext } from 'react';

// interface Client {
//   id: number | string;
//   name: string;
//   email: string;
//   vat_number: string;
//   ct_number: string;
//   password: string;
//   entity_type: string;
//   business_type: string;
//   emirates: string;
//   location: string;
//   upcoming_due: string;
// }

// interface ClientsContextType {
//   clients: Client[];
//   addClient: (client: Client) => void;
// }

// const ClientsContext = createContext<ClientsContextType | undefined>(undefined);

// export const ClientsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [clients, setClients] = useState<Client[]>([]);

//   const addClient = (client: Client) => {
//     setClients((prev) => [...prev, { ...client, id: Date.now() }]);
//   };

//   return (
//     <ClientsContext.Provider value={{ clients, addClient }}>{children}</ClientsContext.Provider>
//   );
// };

// export const useClients = () => {
//   const context = useContext(ClientsContext);
//   if (!context) {
//     throw new Error('useClients must be used within a ClientsProvider');
//   }
//   return context;
// };

// import React, { createContext, useState, useContext, useEffect } from 'react';

// interface Client {
//   id: number | string;
//   name: string;
//   email: string;
//   vat_number: string;
//   ct_number: string;
//   password: string;
//   entity_type: string;
//   business_type: string;
//   emirates: string;
//   location: string;
//   upcoming_due: string;
// }

// interface ClientsContextType {
//   clients: Client[];
//   addClient: (client: Client) => void;
// }

// const ClientsContext = createContext<ClientsContextType | undefined>(undefined);

// export const ClientsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [clients, setClients] = useState<Client[]>([]);

//   // Load from localStorage on initial render
//   useEffect(() => {
//     const storedClients = localStorage.getItem('clients');
//     if (storedClients) {
//       setClients(JSON.parse(storedClients));
//     }
//   }, []);

//   // Save to localStorage whenever clients change
//   useEffect(() => {
//     localStorage.setItem('clients', JSON.stringify(clients));
//   }, [clients]);

//   const addClient = (client: Client) => {
//     setClients((prev) => [...prev, client]);
//   };

//   return (
//     <ClientsContext.Provider value={{ clients, addClient }}>{children}</ClientsContext.Provider>
//   );
// };

// export const useClients = () => {
//   const context = useContext(ClientsContext);
//   if (!context) {
//     throw new Error('useClients must be used within a ClientsProvider');
//   }
//   return context;
// };

import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

interface Client {
  id: number | string;
  name: string;
  email: string;
  vat_number: string;
  ct_number: string;
  password: string;
  entity_type: string;
  business_type: string;
  emirates: string;
  location: string;
  upcoming_due: string;
}

// interface ClientsContextType {
//   clients: Client[];
//   addClient: (client: Omit<Client, 'id'>) => Promise<void>;
// }

interface ClientsContextType {
  clients: Client[];
  addClient: (client: Omit<Client, 'id'>) => Promise<void>;
  deleteClient: (id: number | string) => Promise<void>;
  updateClient: (id: number | string, updatedClient: Partial<Client>) => Promise<void>;
}

const ClientsContext = createContext<ClientsContextType | undefined>(undefined);

// export const ClientsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [clients, setClients] = useState<Client[]>([]);

//   // Fetch clients from backend
//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/clients');
//         setClients(response.data);
//       } catch (error) {
//         console.error('Error fetching clients:', error);
//       }
//     };

//     fetchClients();
//   }, []);

//   // Add client to backend
//   const addClient = async (client: Omit<Client, 'id'>) => {
//     try {
//       const response = await axios.post('http://localhost:5000/clients', client);
//       setClients((prev) => [...prev, response.data]);
//     } catch (error) {
//       console.error('Error adding client:', error);
//     }
//   };

//   return (
//     <ClientsContext.Provider value={{ clients, addClient }}>{children}</ClientsContext.Provider>
//   );
// };

export const ClientsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/clients');
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  const addClient = async (client: Omit<Client, 'id'>) => {
    try {
      const response = await axios.post('http://localhost:5000/clients', client);
      setClients((prev) => [...prev, response.data]);
    } catch (error) {
      console.error('Error adding client:', error);
    }
  };

  const deleteClient = async (id: number | string) => {
    try {
      await axios.delete(`http://localhost:5000/clients/${id}`);
      setClients((prev) => prev.filter((client) => client.id !== id));
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  const updateClient = async (id: number | string, updatedClient: Partial<Client>) => {
    try {
      const response = await axios.put(`http://localhost:5000/clients/${id}`, updatedClient);
      setClients((prev) => prev.map((client) => (client.id === id ? response.data : client)));
    } catch (error) {
      console.error('Error updating client:', error);
    }
  };

  return (
    <ClientsContext.Provider value={{ clients, addClient, deleteClient, updateClient }}>
      {children}
    </ClientsContext.Provider>
  );
};

export const useClients = () => {
  const context = useContext(ClientsContext);
  if (!context) {
    throw new Error('useClients must be used within a ClientsProvider');
  }
  return context;
};
