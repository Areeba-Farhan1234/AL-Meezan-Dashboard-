export interface DocumentFile {
  id: string;
  name: string;
  file: File;
}

export interface ClientFolder {
  id: string;
  name: string;
  documents: DocumentFile[];
}
