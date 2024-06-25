import { useEffect, useState } from "react";

import { Window as KeplrWindow } from "@keplr-wallet/types";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends KeplrWindow {}
}

const ConnectWalletComponent = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const initializeKeplr = async () => {
    const chainId = "cosmoshub-4";
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
      console.log(">>> accounts", accounts);
      if (accounts?.length) {
        setWalletConnected(true);
        setWalletAddress(accounts[0].address);
      }
      // Example: const cosmJS = new SigningCosmosClient("https://lcd-cosmoshub.keplr.app", accounts[0].address, offlineSigner);
    } catch (error) {
      console.error("Failed to enable Keplr:", error);
      alert("Failed to enable Keplr. Check console for details.");
    }
  };

  useEffect(() => {
    initializeKeplr();
  }, []);

  return (
    <div className="flex justify-end m-4">
      {!walletConnected ? (
        <button
          onClick={initializeKeplr}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Connect to Kepler
        </button>
      ) : (
        <div className="bg-gray-800 rounded p-2 flex flex-row justify-center items-center">
          <p className="text-md font-medium pr-4">Connected:</p>
          <p className="text-sm">{walletAddress}</p>
        </div>
      )}
    </div>
  );
};

export default ConnectWalletComponent;
