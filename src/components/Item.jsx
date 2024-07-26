import React from "react";
import { Draggable } from "react-beautiful-dnd";

function Item({ item, index }) {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mx-2 my-4 p-2 border-2 rounded-lg bg-white text-xl text-center"
        >
          {item.content}
        </div>
      )}
    </Draggable>
  );
}

export default Item;
