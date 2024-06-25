import React, { createContext, useContext, useEffect, useState } from "react";
import { NFT } from "@/clients/stargaze";

interface NFTPosition {
  left: number;
  top: number;
}

interface NFTPositionContextType {
  positions: { [key: string]: NFTPosition };
  setPosition: (id: string, left: number, top: number) => void;
  deleteNFT: (id: string) => void;
}

const NFTPositionContext = createContext<NFTPositionContextType | undefined>(
  undefined
);

export const useNFTPositionContext = () => {
  const context = useContext(NFTPositionContext);
  if (!context) {
    throw new Error("useNFTPositionContext must be used within a NFTProvider");
  }
  return context;
};

// Function to calculate initial positions based on available width
const calculateInitialPositions = (nfts: NFT[]) => {
  const containerWidth = 1000; // Example: Replace with actual width calculation
  const maxNftsPerRow = Math.floor(containerWidth / 120); // Assuming each NFT is 120px wide

  let currentTop = 0;
  let currentLeft = 0;
  let n = 0;

  const initialPositions = nfts.reduce((acc, nft, index) => {
    if (index > 0 && index % maxNftsPerRow === 0) {
      currentTop += 150; // Adjust top value after reaching max NFTs per row
      currentLeft = 0;
      n++;
    }

    acc[nft.id] = { left: currentLeft * 120, top: currentTop };
    currentLeft++;

    return acc;
  }, {} as { [key: string]: NFTPosition });

  return initialPositions;
};

export const NFTProvider: React.FC<{
  nfts: NFT[];
  children: React.ReactNode;
}> = ({ nfts, children }: { nfts: NFT[]; children: React.ReactNode }) => {
  const [positions, setPositions] = useState<{ [key: string]: NFTPosition }>(
    () => {
      return calculateInitialPositions(nfts);
    }
  );

  useEffect(() => {
    if (nfts && nfts.length > 0) {
      const initialPositions = calculateInitialPositions(nfts);
      setPositions(initialPositions);
    }
  }, [nfts]);

  const setPosition = (id: string, left: number, top: number) => {
    setPositions((prevPositions) => ({
      ...prevPositions,
      [id]: { left, top },
    }));
  };

  const deleteNFT = (id: string) => {
    setPositions((prevPositions) => {
      const { [id]: deletedNFT, ...rest } = prevPositions;
      return rest;
    });
  };

  return (
    <NFTPositionContext.Provider value={{ positions, setPosition, deleteNFT }}>
      {children}
    </NFTPositionContext.Provider>
  );
};
