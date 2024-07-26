import React from "react";
import { Draggable } from "react-beautiful-dnd";

function Item({ item, index, dragItemId }) {
  console.log(dragItemId);
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`mx-2 my-4 p-2 border-2 rounded-lg bg-white text-xl text-center ${
            snapshot.isDragging ? "bg-green-500" : "bg-white"
          } ${dragItemId === item.id ? "bg-red-500" : "bg-white"} `}
        >
          {item.content}
        </div>
      )}
    </Draggable>
  );
}

export default Item;
