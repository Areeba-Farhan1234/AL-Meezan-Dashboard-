import React, { useState } from 'react';
import { ClientFolder, DocumentFile } from '../../types';

const DocumentDashboard: React.FC = () => {
  const [clients, setClients] = useState<ClientFolder[]>([]);
  const [selectedClient, setSelectedClient] = useState<ClientFolder | null>(null);

  const handleClientSelect = (clientId: string) => {
    const client = clients.find((c) => c.id === clientId) || null;
    setSelectedClient(client);
  };

  const handleAddClient = () => {
    const name = prompt('Enter client name:');
    if (name) {
      const newClient: ClientFolder = {
        id: Date.now().toString(),
        name,
        documents: [],
      };
      setClients((prev) => [...prev, newClient]);
    }
  };

  const handleUploadDocument = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedClient || !e.target.files) return;
    const filesArray = Array.from(e.target.files);
    const newDocuments: DocumentFile[] = filesArray.map((file) => ({
      id: Date.now().toString() + Math.random(),
      name: file.name,
      file,
    }));

    const updatedClients = clients.map((client) => {
      if (client.id === selectedClient.id) {
        return { ...client, documents: [...client.documents, ...newDocuments] };
      }
      return client;
    });

    setClients(updatedClients);
    setSelectedClient(updatedClients.find((c) => c.id === selectedClient.id) || null);
  };

  const handleExport = () => {
    if (!selectedClient) return;
    const content = selectedClient.documents.map((doc) => doc.name).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedClient.name}_documents.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Document Dashboard</h1>
      <div className="flex gap-4">
        <div className="w-1/4 space-y-4">
          <button onClick={handleAddClient} className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Client
          </button>
          <ul className="space-y-2">
            {clients.map((client) => (
              <li
                key={client.id}
                onClick={() => handleClientSelect(client.id)}
                className={`cursor-pointer px-3 py-2 rounded ${selectedClient?.id === client.id ? 'bg-blue-100 font-semibold' : 'bg-gray-100'}`}
              >
                {client.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-3/4 border rounded p-4">
          {selectedClient ? (
            <>
              <h2 className="text-xl font-semibold mb-4">{selectedClient.name} Documents</h2>
              <input
                title="file"
                type="file"
                multiple
                onChange={handleUploadDocument}
                className="mb-4"
              />
              <button
                onClick={handleExport}
                className="bg-green-500 text-white px-3 py-1 rounded ml-2"
              >
                Export List
              </button>
              {/* <ul className="mt-4 space-y-1">
                {selectedClient.documents.map((doc) => (
                  <li key={doc.id} className="text-sm border-b py-1">
                    {doc.name}
                  </li>
                ))}
              </ul> */}
              <ul className="mt-4 space-y-1">
                {[...selectedClient.documents].reverse().map((doc) => (
                  <li key={doc.id} className="text-sm border-b py-1">
                    {doc.name}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-gray-600">Select a client to view documents.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentDashboard;
