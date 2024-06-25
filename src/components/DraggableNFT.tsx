import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./DropZone";
import { NFT } from "@/clients/stargaze";
import { useNFTPositionContext } from "@/providers/NFTPositionProvider";

export interface DraggableNFTProps {
  nft: NFT;
}

const DraggableNFT: React.FC<DraggableNFTProps> = ({ nft }) => {
  const { positions } = useNFTPositionContext();

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.NFT,
    item: { id: nft.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        position: "absolute",
        left: positions[nft.id]?.left,
        top: positions[nft.id]?.top,
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        width: "100px", // Set default width
      }}
    >
      <img src={nft.media.url} alt={nft.name} />
    </div>
  );
};

export default DraggableNFT;
