import React, { ReactNode, useRef } from "react";
import { useDrop } from "react-dnd";
import { useNFTPositionContext } from "@/providers/NFTProvider";

interface DropZoneProps {
  children: ReactNode;
}

interface DropResult {
  id: string;
  left: number;
  top: number;
}

export const ItemTypes = {
  NFT: "nft",
};

const DropZone: React.FC<DropZoneProps> = ({ children }) => {
  const { setPosition } = useNFTPositionContext();
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.NFT,
    drop: (item: DropResult, monitor) => {
      const offset = monitor.getClientOffset();
      const dropZoneBoundingRect = dropZoneRef.current?.getBoundingClientRect();

      if (offset && dropZoneBoundingRect) {
        const relativeX = offset.x - dropZoneBoundingRect.left;
        const relativeY = offset.y - dropZoneBoundingRect.top;
        setPosition(item.id, relativeX, relativeY);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={(node) => {
        drop(node);
        dropZoneRef.current = node;
      }}
      style={{
        width: "100%",
        height: "500px",
        position: "relative",
        backgroundColor: isOver ? "rgba(0, 0, 0, 0.1)" : "transparent",
      }}
    >
      {children}
    </div>
  );
};

export default DropZone;
