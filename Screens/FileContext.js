import React, { createContext, useContext, useState } from 'react';

const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [files, setFiles] = useState({});

  const addFile = (folderName, file) => {
    setFiles(prevFiles => ({
      ...prevFiles,
      [folderName]: [...(prevFiles[folderName] || []), file],
    }));
  };

  const getFilesForFolder = (folderName) => {
    return files[folderName] || [];
  };

  const editFile = (folderName, fileId, updatedFile) => {
    setFiles(prevFiles => {
      const updatedFiles = (prevFiles[folderName] || []).map(file =>
        file.id === fileId ? { ...file, ...updatedFile } : file
      );

      return {
        ...prevFiles,
        [folderName]: updatedFiles,
      };
    });
  };

  const deleteFile = (folderName, fileId) => {
    setFiles(prevFiles => {
      const updatedFiles = (prevFiles[folderName] || []).filter(file => file.id !== fileId);

      return {
        ...prevFiles,
        [folderName]: updatedFiles,
      };
    });
  };

  const toggleFavorite = (folderName, fileId) => {
    setFiles(prevFiles => ({
      ...prevFiles,
      [folderName]: prevFiles[folderName].map(file =>
        file.id === fileId ? { ...file, isFavorite: !file.isFavorite } : file
      ),
    }));
  };

  return (
    <FileContext.Provider value={{ files, addFile, getFilesForFolder, editFile, deleteFile, toggleFavorite }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFiles = () => useContext(FileContext);
