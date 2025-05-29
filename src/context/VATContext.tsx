import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// export interface Client {
//   id: string;
//   clientname: string;
//   email: string;
//   threshold: string;
//   docstatus?: string;
//   approvaldate?: string;
//   returnperiod?: string;
//   password?: string;
//   comment?: string;
//   theme?: string;
// }

export interface VatForm {
  id: number | string;
  Vatname: string;
  threshold?: string;
  approvaldate?: string;
  docstatus: string;
  returnperiod: string;
  email: string;
  password: string;
  comment: string;
  theme: string;
  entity_type: string;
}

interface ClientsContextType {
  clients: VatForm[];
  fetchClients: () => Promise<void>;
  deleteClient: (id: string) => Promise<void>;
  updateClient: (id: string, updatedClient: VatForm) => Promise<void>;
}

const ClientsContext = createContext<ClientsContextType | undefined>(undefined);

export const ClientsProvider = ({ children }: { children: ReactNode }) => {
  const [clients, setClients] = useState<VatForm[]>([]);

  const fetchClients = async () => {
    try {
      const res = await axios.get<VatForm[]>('http://localhost:5000/clients');
      setClients(res.data);
    } catch (err) {
      console.error('Failed to fetch clients:', err);
    }
  };

  const deleteClient = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/clients/${id}`);
      setClients((prev) => prev.filter((client) => client.id !== id));
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  const updateClient = async (id: string, updatedClient: VatForm) => {
    try {
       const response = await axios.patch<VatForm>(`http://localhost:5000/clients/${id}`, updatedClient);    
     setClients((prev) =>
  prev.map((client) =>
    client.id.toString() === id.toString() ? { ...client, ...response.data } : client
  )
      );
    } catch (error) {
      console.error('Error updating client:', error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <ClientsContext.Provider value={{ clients, fetchClients, deleteClient, updateClient }}>
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
