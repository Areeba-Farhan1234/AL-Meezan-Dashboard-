// import React, {
//   createContext,
//   useContext,
//   useState,
//   ReactNode,
//   FormEvent,
//   Dispatch,
//   SetStateAction,
// } from 'react';
// import axios from 'axios';
// import dayjs, { Dayjs } from 'dayjs';

// // --- Type Definitions ---
// export type VATReport = {
//   clientname: string;
//   reportType: string;
//   date: string;
//   status: string;
// };

// export type DeregForm = {
//   threshold: string;
//   docstatus: string;
//   returnperiod: string;
//   email: string;
//   password: string;
//   comment: string;
// };

// type FilterState = {
//   clientname: string;
//   reportType: string;
//   fromDate: Dayjs | null;
//   toDate: Dayjs | null;
// };

// type ExportedVATReport = VATReport & {
//   Threshold: string;
//   Status: string;
//   ReturnPeriod: string;
//   Email: string;
//   Comment: string;
// };

// // --- Context Interface ---
// interface VATDeregistrationContextProps {
//   filters: FilterState;
//   setFilters: Dispatch<SetStateAction<FilterState>>;
//   formDereg: DeregForm;
//   setFormDereg: Dispatch<SetStateAction<DeregForm>>;
//   reportData: VATReport[];
//   filteredData: VATReport[];
//   handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
//   getExportData: () => ExportedVATReport[];
// }

// // --- Create Context ---
// const VATDeregistrationContext = createContext<VATDeregistrationContextProps | undefined>(undefined);

// // --- Provider Props ---
// interface VATDeregistrationProviderProps {
//   children: ReactNode;
// }

// // --- Provider Component ---
// export const VATDeregistrationProvider: React.FC<VATDeregistrationProviderProps> = ({ children }) => {

//   const [filters, setFilters] = useState<FilterState>({
//     clientname: '',
//     reportType: 'VAT',
//     fromDate: null,
//     toDate: null,
//   });

//   const [formDereg, setFormDereg] = useState<DeregForm>({
//     threshold: '',
//     docstatus: '',
//     returnperiod: '',
//     email: '',
//     password: '',
//     comment: '',
//   });

//   const [reportData, setReportData] = useState<VATReport[]>([]);

//   // --- Handle Form Submission ---
//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:5000/vat-deregistration', {
//         ...formDereg,
//         clientname: filters.clientname,
//         reportType: filters.reportType,
//         fromDate: filters.fromDate?.format('YYYY-MM-DD') || '',
//         toDate: filters.toDate?.format('YYYY-MM-DD') || '',
//       });

//       const data = response.data;

//       if (Array.isArray(data)) {
//         setReportData(data);
//       } else {
//         console.warn('Unexpected response format:', data);
//         setReportData([]);
//       }
//     } catch (error) {
//       console.error('API Error:', error);
//     }
//   };

//   // --- Filtered Report Data ---
//   const filteredData = reportData.filter((item) => {
//     const itemDate = dayjs(item.date);
//     const from = filters.fromDate;
//     const to = filters.toDate;

//     return (
//       (!filters.clientname || item.clientname.toLowerCase().includes(filters.clientname.toLowerCase())) &&
//       (!from || itemDate.isAfter(from.subtract(1, 'day'))) &&
//       (!to || itemDate.isBefore(to.add(1, 'day')))
//     );
//   });

//   // --- Export Filtered Data ---
//   const getExportData = (): ExportedVATReport[] => {
//     return filteredData.map((row) => ({
//       ...row,
//       Threshold: formDereg.threshold,
//       Status: formDereg.docstatus,
//       ReturnPeriod: formDereg.returnperiod,
//       Email: formDereg.email,
//       Comment: formDereg.comment,
//     }));
//   };

//   // --- Context Value ---
//   const contextValue: VATDeregistrationContextProps = {
//     filters,
//     setFilters,
//     formDereg,
//     setFormDereg,
//     reportData,
//     filteredData,
//     handleSubmit,
//     getExportData,
//   };

//   return (
//     <VATDeregistrationContext.Provider value={contextValue}>
//       {children}
//     </VATDeregistrationContext.Provider>
//   );
// };

// // --- Custom Hook ---
// export const useVATDeregistration = (): VATDeregistrationContextProps => {
//   const context = useContext(VATDeregistrationContext);
//   if (!context) {
//     throw new Error('useVATDeregistration must be used within a VATDeregistrationProvider');
//   }
//   return context;
// };

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
      const response = await axios.get<VatDeregForm[]>('http://localhost:5000/vat-deregistration');
      setVatDeregList(response.data);
    } catch (error) {
      console.error('Failed to fetch VAT deregistration records:', error);
    }
  };

  // Delete a record by ID
  const deleteVatDereg = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/vat-deregistration/${id}`);
      setVatDeregList((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting VAT deregistration record:', error);
    }
  };

  // Update a record by ID
  const updateVatDereg = async (id: string, updatedData: VatDeregForm) => {
    try {
      const response = await axios.patch<VatDeregForm>(
        `http://localhost:5000/vat-deregistration/${id}`,
        updatedData,
      );
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
