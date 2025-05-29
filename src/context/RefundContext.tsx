// RefundContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Dayjs } from 'dayjs';

export type VATReport = {
  clientname: string;
  status: string;
  refundamount: string;
  applicationsubmission: string;
};

interface RefundContextType {
  client: string;
  setClient: (val: string) => void;
  reportType: string;
  setReportType: (val: string) => void;
  fromDate: Dayjs | null;
  setFromDate: (val: Dayjs | null) => void;
  toDate: Dayjs | null;
  setToDate: (val: Dayjs | null) => void;
  reports: VATReport[];
  setReports: (val: VATReport[]) => void;
  fetchReports: () => Promise<void>;
}

const RefundContext = createContext<RefundContextType | undefined>(undefined);

export const RefundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [client, setClient] = useState('');
  const [reportType, setReportType] = useState('');
  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(null);
  const [reports, setReports] = useState<VATReport[]>([]);

  const fetchReports = async () => {
    const params = new URLSearchParams();
    if (client) params.append('client', client);
    if (reportType) params.append('type', reportType);
    if (fromDate) params.append('from', fromDate.format('YYYY-MM-DD'));
    if (toDate) params.append('to', toDate.format('YYYY-MM-DD'));

    try {
      const res = await fetch(`/api/reports?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch reports');
      const data = await res.json();
      setReports(data);
    } catch (error) {
      console.error(error);
      setReports([]);
    }
  };

  return (
    <RefundContext.Provider
      value={{
        client,
        setClient,
        reportType,
        setReportType,
        fromDate,
        setFromDate,
        toDate,
        setToDate,
        reports,
        setReports,
        fetchReports,
      }}
    >
      {children}
    </RefundContext.Provider>
  );
};

export const useRefundContext = () => {
  const context = useContext(RefundContext);
  if (!context) {
    throw new Error('useRefundContext must be used within a RefundProvider');
  }
  return context;
};
