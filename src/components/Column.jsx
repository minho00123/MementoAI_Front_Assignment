import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Item from "./Item.jsx";

function Column({
  columnId,
  items,
  index,
  selectedItems,
  setSelectedItems,
  isDragDisabled,
  draggingItems,
}) {
  return (
    <Draggable key={columnId} draggableId={columnId} index={index}>
      {(provided) => (
        <article
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="w-full m-5 px-10 py-2 border-2 rounded-lg bg-gray-300 text-3xl"
        >
          <div>{columnId}</div>
          <Droppable droppableId={columnId}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-0 ${
                  snapshot.isDraggingOver ? "bg-blue-200" : "bg-gray-300"
                }`}
              >
                {items.map((item, index) => (
                  <Item
                    key={item.id}
                    item={item}
                    index={index}
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                    isDragDisabled={isDragDisabled}
                    draggingItems={draggingItems}
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
