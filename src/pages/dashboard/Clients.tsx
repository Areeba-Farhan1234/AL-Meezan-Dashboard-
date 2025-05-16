import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

type Client = {
  name: string;
  contact: string;
  email: string;
  address: string;
  vat: string;
};

const clientsData: Client[] = [
  {
    name: 'Ahsan Anwar',
    contact: 'None',
    email: 'ahsanwar1996@gmail.com',
    address: 'None',
    vat: '434345',
  },
  {
    name: 'Shakil Anwar',
    contact: 'None',
    email: 'ahsan.freelancer1996@gmail.com',
    address: 'None',
    vat: '4544333',
  },
  {
    name: 'Abdullah',
    contact: 'None',
    email: 'ahsanwar1996@gmail.com',
    address: 'None',
    vat: '4565644',
  },
  {
    name: 'Abdul Ahad',
    contact: 'None',
    email: 'ahsanwar1996@gmail.com',
    address: 'None',
    vat: '5446443',
  },
  {
    name: 'Ahsan Anwar',
    contact: 'None',
    email: 'ahsan.freelancer1996@gmail.com',
    address: 'None',
    vat: '54545',
  },
  {
    name: 'Ali Hassan',
    contact: 'None',
    email: 'ahsanwar1996@gmail.com',
    address: 'None',
    vat: '858838',
  },
  {
    name: 'Numan Ahmed',
    contact: 'None',
    email: 'ahsanwar1996@gmail.com',
    address: 'None',
    vat: '544632',
  },
  {
    name: 'Fahad Anees',
    contact: 'None',
    email: 'fahad@gmail.com',
    address: 'None',
    vat: '220330',
  },
  {
    name: 'Hammad Ali',
    contact: 'None',
    email: 'ahsanwar1996@gmail.com',
    address: 'None',
    vat: '23222454',
  },
];

const ClientsTable: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Customers Details</h2>
        <button className="bg-[#4F46E5] text-white px-5 py-2 rounded-lg shadow hover:bg-[#4338CA] transition duration-200">
          Add New
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase tracking-wider text-xs">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Address</th>
              <th className="px-4 py-3">VAT Number</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {clientsData.map((client, index) => (
              <tr key={index} className="hover:bg-gray-50 transition duration-200">
                <td className="px-4 py-3 whitespace-nowrap">{client.name}</td>
                <td className="px-4 py-3">{client.contact}</td>
                <td className="px-4 py-3">{client.email}</td>
                <td className="px-4 py-3">{client.address}</td>
                <td className="px-4 py-3">{client.vat}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <button
                      title="Edit"
                      className="text-indigo-600 hover:text-indigo-800 transition"
                    >
                      <FaEdit />
                    </button>
                    <button title="Delete" className="text-red-600 hover:text-red-800 transition">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientsTable;
