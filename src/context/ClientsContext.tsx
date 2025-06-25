import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Define the Client interface
export interface Client {
  _id: number | string;
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

// Define the context type
interface ClientsContextType {
  clients: Client[];
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
  addClient: (client: Omit<Client, '_id'>) => Promise<void>;
  deleteClient: (id: number | string) => Promise<void>;
  updateClient: (id: number | string, updatedClient: Partial<Client>) => Promise<void>;
}

// Create the context
const ClientsContext = createContext<ClientsContextType | undefined>(undefined);

// Provider component
export const ClientsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get<Client[]>('/clients');
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  const addClient = async (client: Omit<Client, '_id'>) => {
    try {
      const response = await axios.post<Client>('/clients', client);
      setClients((prev) => [...prev, response.data]);
    } catch (error) {
      console.error('Error adding client:', error);
    }
  };

  const deleteClient = async (id: number | string) => {
    try {
      await axios.delete(`/clients/${id}`);
      setClients((prev) => prev.filter((client) => client._id !== id));
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  const updateClient = async (id: number | string, updatedClient: Partial<Client>) => {
    try {
      const response = await axios.patch<Client>(`/clients/${id}`, updatedClient);
      setClients((prev) =>
        prev.map((client) =>
          client._id.toString() === id.toString() ? { ...client, ...response.data } : client,
        ),
      );
    } catch (error) {
      console.error('Error updating client:', error);
    }
  };

  return (
    <ClientsContext.Provider value={{ clients, setClients, addClient, deleteClient, updateClient }}>
      {children}
    </ClientsContext.Provider>
  );
};

// Custom hook to use the context
export const useClients = (): ClientsContextType => {
  const context = useContext(ClientsContext);
  if (!context) {
    throw new Error('useClients must be used within a ClientsProvider');
  }
  return context;
};

// import React, { createContext, useState, useEffect, useContext } from 'react';
// import axios from 'axios';

// // Define the Client interface
// export interface Client {
//   _id: number | string;
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

// // Define the context type
// interface ClientsContextType {
//   clients: Client[];
//   setClients: React.Dispatch<React.SetStateAction<Client[]>>;
//   addClient: (client: Omit<Client, '_id'>) => Promise<void>;
//   deleteClient: (id: number | string) => Promise<void>;
//   updateClient: (id: number | string, updatedClient: Partial<Client>) => Promise<void>;
// }

// // Create the context
// const ClientsContext = createContext<ClientsContextType | undefined>(undefined);

// // Provider component
// export const ClientsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [clients, setClients] = useState<Client[]>([]);

//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         const response = await axios.get<Client[]>('/clients');
//         setClients(response.data);
//       } catch (error) {
//         console.error('Error fetching clients:', error);
//       }
//     };

//     fetchClients();
//   }, []);

//   const addClient = async (client: Omit<Client, '_id'>) => {
//     try {
//       const response = await axios.post<Client>('/clients', client);
//       setClients((prev) => [...prev, response.data]);
//     } catch (error) {
//       console.error('Error adding client:', error);
//     }
//   };

//   const deleteClient = async (id: number | string) => {
//     try {
//       await axios.delete(`/clients/${id}`);
//       setClients((prev) => prev.filter((client) => client._id !== id));
//     } catch (error) {
//       console.error('Error deleting client:', error);
//     }
//   };

//   const updateClient = async (id: number | string, updatedClient: Partial<Client>) => {
//     try {
//       const response = await axios.patch<Client>(`/clients/${id}`, updatedClient);
//       setClients((prev) =>
//         prev.map((client) =>
//           client._id.toString() === id.toString() ? { ...client, ...response.data } : client,
//         ),
//       );
//     } catch (error) {
//       console.error('Error updating client:', error);
//     }
//   };

//   return (
//     <ClientsContext.Provider value={{ clients, setClients, addClient, deleteClient, updateClient }}>
//       {children}
//     </ClientsContext.Provider>
//   );
// };

// // Custom hook to use the context
// export const useClients = (): ClientsContextType => {
//   const context = useContext(ClientsContext);
//   if (!context) {
//     throw new Error('useClients must be used within a ClientsProvider');
//   }
//   return context;
// };
