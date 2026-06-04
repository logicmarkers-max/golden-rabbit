import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

const FilterProvider = ({ children }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const setFilter = (filter) => {
    setActiveFilter(filter || 'All');
  };

  return (
    <FilterContext.Provider value={{ filter: activeFilter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilterContext must be used within a FilterProvider');
  }
  return context;
};

export { FilterProvider, useFilterContext };