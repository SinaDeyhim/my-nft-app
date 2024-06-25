import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
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
    throw new Error(
      "useNFTPositionContext must be used within a NFTPositionProvider"
    );
  }
  return context;
};

export const NFTPositionProvider: React.FC<{
  nfts: NFT[];
  children: ReactNode;
}> = ({ nfts, children }: { nfts: NFT[]; children: ReactNode }) => {
  const [positions, setPositions] = useState<{ [key: string]: NFTPosition }>(
    () => {
      return nfts.reduce((acc, nft, index) => {
        acc[nft.id] = { left: index * 120, top: 0 }; // Initial positions
        return acc;
      }, {});
    }
  );

  useEffect(() => {
    // Initialize positions when initialNFTs change
    if (nfts && nfts.length > 0) {
      const initialPositions = nfts.reduce((acc, nft, index) => {
        acc[nft.id] = { left: index * 120, top: 0 }; // Assuming 120px width for each NFT
        return acc;
      }, {});
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
