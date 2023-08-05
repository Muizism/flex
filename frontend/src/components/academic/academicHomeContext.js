import React, { createContext, useContext, useState } from 'react';

const AcademicContext = createContext();

export function AcademicProvider({ children }) {
  const [academicId, setAcademicId] = useState(null);

  const setAcademic = (id) => {
    setAcademicId(id);
  };

  return (
    <AcademicContext.Provider value={{ academicId, setAcademic }}>
      {children}
    </AcademicContext.Provider>
  );
}

export function useAcademicContext() {
  return useContext(AcademicContext);
}
