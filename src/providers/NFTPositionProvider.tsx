import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { NFT } from "@/clients/stargaze";

interface NFTPosition {
  left: number;
  top: number;
}

interface NFTPositionContextType {
  positions: { [key: string]: NFTPosition };
  setPosition: (id: string, left: number, top: number) => void;
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

interface NFTPositionProviderProps {
  nfts: NFT[];
  children: ReactNode;
}

export const NFTPositionProvider: React.FC<NFTPositionProviderProps> = ({
  nfts,
  children,
}) => {
  const [positions, setPositions] = useState<{ [key: string]: NFTPosition }>(
    {}
  );

  useEffect(() => {
    setPositions((prevPositions) => {
      const newPositions = nfts?.reduce((acc, nft, index) => {
        if (!prevPositions[nft.id]) {
          acc[nft.id] = { left: index * 120, top: 0 }; // Assuming 120px width for each NFT
        } else {
          acc[nft.id] = prevPositions[nft.id];
        }
        return acc;
      }, {});
      return newPositions;
    });
  }, [nfts]);

  const setPosition = (id: string, left: number, top: number) => {
    setPositions((prevPositions) => ({
      ...prevPositions,
      [id]: { left, top },
    }));
  };

  return (
    <NFTPositionContext.Provider value={{ positions, setPosition }}>
      {children}
    </NFTPositionContext.Provider>
  );
};
