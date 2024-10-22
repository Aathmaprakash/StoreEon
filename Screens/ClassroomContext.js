// ClassroomContext.js
import React, { createContext, useState, useContext } from 'react';

const ClassroomContext = createContext();

export const ClassroomProvider = ({ children }) => {
  const [classrooms, setClassrooms] = useState([]);

  const addClassroom = (newClassroom) => {
    setClassrooms(prevClassrooms => [...prevClassrooms, newClassroom]);
  };

  const removeClassroom = (classroomToRemove) => {
    setClassrooms(classrooms.filter(classroom => classroom !== classroomToRemove));
  };

  return (
    <ClassroomContext.Provider value={{ classrooms, addClassroom,removeClassroom }}>
      {children}
    </ClassroomContext.Provider>
  );
};

export const useClassroom = () => useContext(ClassroomContext);