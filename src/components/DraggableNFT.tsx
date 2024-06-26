import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./DropZone";
import { NFT } from "@/clients/stargaze";
import { useNFTPositionContext } from "@/providers/NFTProvider";
import Image from "next/image";

interface DraggableNFTProps {
  nft: NFT;
}

const DraggableNFT: React.FC<DraggableNFTProps> = ({ nft }) => {
  const { positions, deleteNFT } = useNFTPositionContext();
  const [deleted, setDeleted] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.NFT,
    item: { id: nft.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const handleDelete = () => {
    deleteNFT(nft.id);
    setDeleted(true);
  };

  return (
    <div
      //@ts-ignore
      ref={drag}
      style={{
        position: "absolute",
        display: deleted ? "none" : "block",
        left: positions[nft.id]?.left,
        top: positions[nft.id]?.top,
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        width: "100px", // Set default width
        height: "100px", // Set default height
      }}
    >
      <Image
        src={nft.media.url}
        alt={nft.id}
        width={100}
        height={120}
        style={{ borderRadius: 4 }}
      />
      <button
        onClick={handleDelete}
        style={{ position: "absolute", top: 0, right: 3, fontSize: 12 }}
      >
        X
      </button>
    </div>
  );
};

export default DraggableNFT;
