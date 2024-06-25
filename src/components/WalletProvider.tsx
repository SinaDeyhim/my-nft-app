import React, { createContext, useState, useContext, ReactNode } from "react";

// Define types for context value
interface WalletContextType {
  walletAddress: string;
  connectWallet: (address: string) => void;
}

// Create context with initial empty values
const initialContext: WalletContextType = {
  walletAddress: "",
  connectWallet: () => {},
};

// Create context
const WalletContext = createContext(initialContext);

// Custom hook to use WalletContext
export const useWallet = (): WalletContextType => {
  return useContext(WalletContext);
};

// Wallet provider component
export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [walletAddress, setWalletAddress] = useState<string>(""); // Initially no wallet connected

  // Function to set wallet address
  const connectWallet = (address: string): void => {
    setWalletAddress(address);
  };

  // Context value
  const value: WalletContextType = {
    walletAddress,
    connectWallet,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};
