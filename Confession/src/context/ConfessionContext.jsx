import { createContext, useContext, useState } from "react";

const ConfessionContext = createContext();

export const ConfessionProvider = ({ children }) => {
  const [confessions, setConfessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <ConfessionContext.Provider
      value={{
        confessions,
        setConfessions,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </ConfessionContext.Provider>
  );
};

export const useConfessionContext = () => {
  const context = useContext(ConfessionContext);
  if (!context) {
    throw new Error(
      "useConfessionContext must be used inside ConfessionProvider"
    );
  }
  return context;
};