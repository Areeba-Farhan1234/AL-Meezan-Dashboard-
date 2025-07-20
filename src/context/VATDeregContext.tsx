import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Data type for VAT deregistration form
export interface VatDeregForm {
  _id: string;
  clientname: string;
  BasisofDeregistration?: string;
  docstatus?: string;
  submissionDate?: string;
  status?: string;
  applicationapprovaldate?: string;
  email?: string;
  password?: string;
  comment?: string;
  reportType?: string;
  entity_type?: string;
  fromDate?: string;
  toDate?: string;
  approvaldate?: string;
  returnperiod: string;
}

// Context type
interface VatDeregContextType {
  vatDeregList: VatDeregForm[];
  fetchVatDeregList: () => Promise<void>;
  deleteVatDereg: (id: string) => Promise<void>;
  updateVatDereg: (id: string, updatedData: VatDeregForm) => Promise<void>;
}

// Create context
const VatDeregContext = createContext<VatDeregContextType | undefined>(undefined);

// Provider component
export const VatDeregProvider = ({ children }: { children: ReactNode }) => {
  const [vatDeregList, setVatDeregList] = useState<VatDeregForm[]>([]);

  // Fetch all VAT deregistration records
  const fetchVatDeregList = async () => {
    try {
      const response = await axios.get<VatDeregForm[]>('/dereg');
      setVatDeregList(response.data);
    } catch (error) {
      console.error('Failed to fetch VAT deregistration records:', error);
    }
  };

  // Delete a record by ID
  const deleteVatDereg = async (id: string) => {
    try {
      await axios.delete(`/dereg/${id}`);
      setVatDeregList((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting VAT deregistration record:', error);
    }
  };

  // Update a record by ID
  const updateVatDereg = async (id: string, updatedData: VatDeregForm) => {
    try {
      const response = await axios.patch<VatDeregForm>(`/dereg/${id}`, updatedData);
      setVatDeregList((prev) =>
        prev.map((item) => (item._id === id ? { ...item, ...response.data } : item)),
      );
    } catch (error) {
      console.error('Error updating VAT deregistration record:', error);
    }
  };

  // Fetch data on mount
  useEffect(() => {
    fetchVatDeregList();
  }, []);

  return (
    <VatDeregContext.Provider
      value={{ vatDeregList, fetchVatDeregList, deleteVatDereg, updateVatDereg }}
    >
      {children}
    </VatDeregContext.Provider>
  );
};

// Hook to use the VAT Deregistration context
export const useVatDereg = () => {
  const context = useContext(VatDeregContext);
  if (!context) {
    throw new Error('useVatDereg must be used within a VatDeregProvider');
  }
  return context;
};
