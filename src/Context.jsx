import React, { createContext, useState } from 'react';

const Context = createContext();
const ContextProvider = ({ children }) => {
  const [clickedCity, setClickedCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState('tempature');
  const [active, setActive] = useState({ path: 0, point: 0 });

  return (
    <Context.Provider
      value={{
        clickedCity,
        setClickedCity,
        isLoading,
        setIsLoading,
        selectedCondition,
        setSelectedCondition,
        active,
        setActive,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { ContextProvider, Context };
