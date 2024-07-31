import React from "react";
import { Draggable } from "react-beautiful-dnd";

function Item({
  item,
  index,
  selectedItems,
  setSelectedItems,
  isDragDisabled,
  draggingItems,
}) {
  const isSelected = selectedItems.includes(item);

  const handleSelect = (e) => {
    if (e.metaKey || e.ctrlKey) {
      if (isSelected) {
        setSelectedItems(selectedItems.filter((i) => i !== item));
      } else {
        setSelectedItems([...selectedItems, item]);
      }
    } else {
      setSelectedItems([item]);
    }
  };

  const getItemClass = () => {
    if (isDragDisabled && draggingItems.includes(item)) {
      return "bg-red-500";
    }
    if (isSelected) {
      return "bg-blue-500";
    }
    return "bg-white";
  };

  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={handleSelect}
          className={`my-5 p-2 border-2 rounded-lg text-xl text-center cursor-pointer ${getItemClass()}`}
        >
          {item.content}
        </div>
      )}
    </Draggable>
  );
}

export default Item;
