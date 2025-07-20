import axios from 'axios';
import { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'react-toastify';

// --- Interfaces ---
export interface Owner {
  name: string;
  nationality: string;
  contact: string;
  email: string;
  pep: string;
  isEditing: boolean;
}

export interface RegulatoryInfo {
  id: number | string;
  description: string;
}

export interface KYCData {
  _id?: string;
  name: string;
  office_no: string;
  building_name: string;
  street_address: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  telephone_no: string;
  fax_number: string;
  email: string;
  annual_business: string;
  owners: Owner[];
  regulatoryInformation?: RegulatoryInfo[]; // ✅ Add this line
}

interface APIResponse<T> {
  status: string;
  message: string;
  data: T;
}

interface KYCContextType {
  kycData: KYCData;
  // setKycData: (data: KYCData) => void;
  setKycData: React.Dispatch<React.SetStateAction<KYCData>>;

  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitKYC: () => Promise<boolean>;
  fetchKYC: () => Promise<void>;
  deleteKYC: (id: string) => Promise<void>;
  updateKYC: (id: string) => Promise<boolean>;
  resetForm: () => void;
  kycList: KYCData[];
}

// --- Constants ---
const API_URL = 'http://localhost:5000/kyc';

const defaultKYCData: KYCData = {
  name: '',
  office_no: '',
  building_name: '',
  street_address: '',
  city: '',
  state: '',
  country: '',
  zip: '',
  telephone_no: '',
  fax_number: '',
  email: '',
  annual_business: '',
  owners: [
    {
      name: '',
      nationality: '',
      contact: '',
      email: '',
      pep: '',
      isEditing: false,
    },
  ],
  regulatoryInformation: [], // ✅ Add this line
};

// --- Context ---
const KYCContext = createContext<KYCContextType | undefined>(undefined);

// --- Provider ---
export const KYCProvider = ({ children }: { children: ReactNode }) => {
  const [kycData, setKycData] = useState<KYCData>(defaultKYCData);
  const [kycList, setKycList] = useState<KYCData[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setKycData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setKycData(defaultKYCData);
  };

  const fetchKYC = async (): Promise<void> => {
    try {
      const res = await axios.get<APIResponse<KYCData[]>>(API_URL);
      setKycList(res.data.data);
    } catch (err) {
      console.error('Fetch Error:', err);
      toast.error('Failed to fetch KYC list.');
    }
  };

  const submitKYC = async (): Promise<boolean> => {
    try {
      const res = await axios.post<APIResponse<KYCData>>(API_URL, kycData);
      setKycData(res.data.data); // update with _id
      setKycList((prev) => [...prev, res.data.data]);
      toast.success('KYC submitted successfully!', { position: 'bottom-right' });
      return true;
    } catch (error) {
      console.error('Submit KYC error:', error);
      toast.error('Submission failed.');
      return false;
    }
  };

  const updateKYC = async (id: string): Promise<boolean> => {
    try {
      const res = await axios.put<APIResponse<KYCData>>(`${API_URL}/${id}`, kycData);
      setKycList((prev) => prev.map((item) => (item._id === id ? res.data.data : item)));
      setKycData(res.data.data);
      toast.success('KYC updated successfully!', { position: 'bottom-right' });
      return true;
    } catch (err) {
      console.error('Update Error:', err);
      toast.error('Update failed.');
      return false;
    }
  };

  const deleteKYC = async (id: string): Promise<void> => {
    try {
      await axios.delete<APIResponse<null>>(`${API_URL}/${id}`);
      setKycList((prev) => prev.filter((item) => item._id !== id));
      resetForm();
      toast.success('KYC deleted successfully!', { position: 'bottom-right' });
    } catch (err) {
      console.error('Delete Error:', err);
      toast.error('Delete failed.');
    }
  };

  return (
    <KYCContext.Provider
      value={{
        kycData,
        setKycData,
        handleChange,
        submitKYC,
        fetchKYC,
        deleteKYC,
        updateKYC,
        resetForm,
        kycList,
      }}
    >
      {children}
    </KYCContext.Provider>
  );
};

// --- Hook ---
export const useKYC = () => {
  const context = useContext(KYCContext);
  if (!context) {
    throw new Error('useKYC must be used within a KYCProvider');
  }
  return context;
};
