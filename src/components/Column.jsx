import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Item from "./Item.jsx";

function Column({ columnId, items, index, dropColumn, dragItemId }) {
  return (
    <Draggable key={columnId} draggableId={columnId} index={index}>
      {(provided) => (
        <article
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="m-5 p-4 border-2 rounded-lg text-3xl"
        >
          <div>{columnId}</div>
          <Droppable
            droppableId={columnId}
            isDropDisabled={dropColumn === columnId}
          >
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`${
                  snapshot.isDraggingOver ? "bg-gray-300" : "bg-white"
                }`}
              >
                {items.map((item, index) => (
                  <Item
                    key={item.id}
                    item={item}
                    index={index}
                    dragItemId={dragItemId}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </article>
      )}
    </Draggable>
  );
}

export default Column;
