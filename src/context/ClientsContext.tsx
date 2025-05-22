// import React, { createContext, useState, useEffect, useContext } from 'react';
// import axios from 'axios';

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
//   addClient: (client: Omit<Client, 'id'>) => Promise<void>;
//   deleteClient: (id: number | string) => Promise<void>;
//   updateClient: (id: number | string, updatedClient: Partial<Client>) => Promise<void>;
// }

// const ClientsContext = createContext<ClientsContextType | undefined>(undefined);

// export const ClientsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [clients, setClients] = useState<Client[]>([]);

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

//   const addClient = async (client: Omit<Client, 'id'>) => {
//     try {
//       const response = await axios.post('http://localhost:5000/clients', client);
//       setClients((prev) => [...prev, response.data]);
//     } catch (error) {
//       console.error('Error adding client:', error);
//     }
//   };

//   const deleteClient = async (id: number | string) => {
//     try {
//       const clientId = String(id);
//       console.log('Attempting to delete client ID:', clientId);
//       await axios.delete(`http://localhost:5000/clients/${clientId}`);
//       setClients((prevClients) => prevClients.filter((client) => String(client.id) !== clientId));
//     } catch (error) {
//       console.error('Error deleting client:', error);
//     }
//   };

//   const updateClient = async (id: number | string, updatedClient: Partial<Client>) => {
//     try {
//       // PUT request with partial updated fields (only what changed)
//       const response = await axios.put(`http://localhost:5000/clients/${id}`, updatedClient);

//       // Update local state with the updated client data from the server
//       setClients((prev) => prev.map((client) => (client.id === id ? response.data : client)));
//     } catch (error) {
//       console.error('Error updating client:', error);
//     }
//   };

//   return (
//     <ClientsContext.Provider value={{ clients, addClient, deleteClient, updateClient }}>
//       {children}
//     </ClientsContext.Provider>
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

export interface Client {
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

interface ClientsContextType {
  clients: Client[];
  addClient: (client: Omit<Client, 'id'>) => Promise<void>;
  deleteClient: (id: number | string) => Promise<void>;
  updateClient: (id: number | string, updatedClient: Partial<Client>) => Promise<void>;
}

const ClientsContext = createContext<ClientsContextType | undefined>(undefined);

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
      const response = await axios.patch(`http://localhost:5000/clients/${id}`, updatedClient);
      setClients((prev) =>
        prev.map((client) => (client.id === id ? { ...client, ...response.data } : client)),
      );
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

export const useClients = (): ClientsContextType => {
  const context = useContext(ClientsContext);
  if (!context) {
    throw new Error('useClients must be used within a ClientsProvider');
  }
  return context;
};

// const updateClient = async (id: number | string, updatedClient: Partial<Client>) => {
//   try {
//     const response = await axios.put(`http://localhost:5000/clients/${id}`, updatedClient);
//     setClients((prev) => prev.map((client) => (client.id === id ? response.data : client)));
//   } catch (error) {
//     console.error('Error updating client:', error);
//   }
// };
