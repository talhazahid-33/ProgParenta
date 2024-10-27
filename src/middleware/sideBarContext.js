import React, { createContext, useState, useContext } from "react";

const DisplayBarContext = createContext();

export const DisplayBarProvider = ({ children }) => {
  const [displayBar, setDisplayBar] = useState(true);

  const toggleDisplayBar = (status) => {
    setDisplayBar(status);
  };

  return (
    <DisplayBarContext.Provider value={{ displayBar, toggleDisplayBar }}>
      {children}
    </DisplayBarContext.Provider>
  );
};

export const useDisplayBar = () => useContext(DisplayBarContext);
