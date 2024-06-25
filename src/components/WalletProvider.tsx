import React, { createContext, useState, useContext, ReactNode } from "react";

// Define types for context value
interface WalletContextType {
  walletAddress: string;
  connected: boolean;
  connectWallet: (address: string) => void;
  setWalletConnected: (connected: boolean) => void;
}

// Create context with initial empty values
const initialContext: WalletContextType = {
  walletAddress: "",
  connected: false,
  connectWallet: () => {},
  setWalletConnected: () => {},
};

// Create context
const WalletContext = createContext(initialContext);

// Custom hook to use WalletContext
export const useWallet = (): WalletContextType => {
  return useContext(WalletContext);
};

// Wallet provider component
export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [connected, setConnected] = useState(false);

  // Function to set wallet address
  const connectWallet = (address: string): void => {
    setWalletAddress(address);
  };

  // Function to set wallet address
  const setWalletConnected = (connected: boolean): void => {
    setConnected(connected);
  };

  // Context value
  const value: WalletContextType = {
    walletAddress,
    connectWallet,
    connected,
    setWalletConnected,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};
