import { useCallback, useEffect, useState } from "react";

import { AccountData, Window as KeplrWindow } from "@keplr-wallet/types";
import { useWallet } from "./WalletProvider";

declare global {
  interface Window extends KeplrWindow {}
}

function findStargazeAddress(
  accounts: readonly AccountData[]
): string | undefined {
  // Iterate through each address in the accounts array
  for (const account of accounts) {
    // Check if the address starts with 'star'
    if (account.address.startsWith("star")) {
      return account.address; // Return the address if found
    }
  }
  return undefined; // Return undefined if no address starts with 'star'
}

const ConnectWalletComponent = () => {
  const { walletAddress, connectWallet, connected, setWalletConnected } =
    useWallet();

  const initializeKeplr = useCallback(async () => {
    const chainId = "stargaze-1";
    // Check if Keplr is installed
    if (!window.keplr) {
      alert("Please install Keplr extension");
      return;
    }

    // Enable Keplr and get offline signer
    try {
      await window.keplr.enable(chainId);
      const offlineSigner = window.keplr.getOfflineSigner(chainId);
      // Perform further actions with offlineSigner if needed
      const accounts = await offlineSigner.getAccounts();
      const stargazeAddress = findStargazeAddress(accounts);
      if (stargazeAddress) {
        setWalletConnected(true);
        connectWallet(stargazeAddress);
      } else {
        alert("No stargaze address found. Please type your address manually");
        setWalletConnected(false);
      }
    } catch (error) {
      setWalletConnected(false);
      console.error("Failed to enable Keplr:", error);
    }
  }, [connectWallet, setWalletConnected]);

  const disconnectWallet = () => {
    connectWallet(""); // Clear the wallet address
    setWalletConnected(false);
  };

  useEffect(() => {
    initializeKeplr();
  }, []);

  return (
    <div className="flex justify-end m-4">
      {!connected ? (
        <button
          onClick={initializeKeplr}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[180px]"
        >
          Connect to Kepler
        </button>
      ) : (
        <div className="bg-gray-800 rounded p-2 flex flex-row justify-center items-center">
          <p className="text-md font-medium pr-4">Connected:</p>
          <p className="text-sm">{walletAddress}</p>
          <button
            onClick={disconnectWallet}
            className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-1 px-3 rounded mx-2"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default ConnectWalletComponent;
