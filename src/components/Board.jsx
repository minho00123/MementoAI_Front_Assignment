import React, { useCallback, useState } from "react";
import { reorder } from "../utils/reorder.js";
import { getColumns } from "../mocks/mockData.js";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import "../index.css";
import Column from "./Column.jsx";

function Board() {
  const [columns, setColumns] = useState(getColumns(4));
  const [columnsOrder, setColumnsOrder] = useState(Object.keys(columns));
  const [selectedItems, setSelectedItems] = useState([]);
  const [draggingItems, setDraggingItems] = useState([]);
  const [isDragDisabled, setIsDragDisabled] = useState(false);

  const onDragStart = useCallback(
    (start) => {
      const { draggableId, source } = start;

      const sourceColumn = columns[source.droppableId] || [];

      const draggedItem = sourceColumn.find((item) => item.id === draggableId);

      const draggingItems = selectedItems.includes(draggedItem)
        ? selectedItems
        : [draggedItem];

      setDraggingItems(
        draggingItems.sort(
          (a, b) => parseInt(a.id.split("-")[1]) - parseInt(b.id.split("-")[1])
        )
      );
      setIsDragDisabled(false);
    },
    [columns, selectedItems]
  );

  const onDragUpdate = useCallback(
    (update) => {
      const { source, destination } = update;

      if (!destination) {
        setIsDragDisabled(false);
        return;
      }

      if (
        source.droppableId === columnsOrder[0] &&
        destination.droppableId === columnsOrder[2]
      ) {
        setIsDragDisabled(true);
        return;
      }

      const sourceColumn = columns[source.droppableId] || [];
      const destinationColumn = columns[destination.droppableId] || [];
      const draggingItem = sourceColumn[source.index];
      const destinationItem = destinationColumn[destination.index];

      if (source.droppableId === destination.droppableId) {
        if (
          draggingItem &&
          parseInt(draggingItem.content.split(" ")[1]) % 2 === 0 &&
          destinationItem &&
          parseInt(destinationItem.content.split(" ")[1]) % 2 === 1 &&
          parseInt(destinationItem.content.split(" ")[1]) !== 1
        ) {
          setIsDragDisabled(true);
          return;
        }
      } else {
        if (
          draggingItem &&
          parseInt(draggingItem.content.split(" ")[1]) % 2 === 0 &&
          destinationItem &&
          parseInt(destinationItem.content.split(" ")[1]) % 2 === 0
        ) {
          setIsDragDisabled(true);
          return;
        }
      }

      setIsDragDisabled(false);
    },
    [columns]
  );

  const onDragEnd = useCallback(
    (result) => {
      const { source, destination, type } = result;

      if (!destination) {
        setDraggingItems([]);
        setIsDragDisabled(false);
        return;
      }

      if (isDragDisabled) {
        setDraggingItems([]);
        setIsDragDisabled(false);
        return;
      }

      if (type === "COLUMN") {
        const newColumnsOrder = reorder(
          columnsOrder,
          source.index,
          destination.index
        );

        setColumnsOrder(newColumnsOrder);
        setDraggingItems([]);
        setIsDragDisabled(false);
        return;
      }

      const updatedColumns = { ...columns };

      updatedColumns[source.droppableId] = updatedColumns[
        source.droppableId
      ].filter((item) => !draggingItems.includes(item));

      updatedColumns[destination.droppableId].splice(
        destination.index,
        0,
        ...draggingItems
      );

      setColumns(updatedColumns);
      setDraggingItems([]);
      setSelectedItems([]);
      setIsDragDisabled(false);
    },
    [columns, columnsOrder, draggingItems, isDragDisabled]
  );

  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId="column" type="COLUMN" direction="horizontal">
        {(provided) => (
          <section
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex justify-evenly h-screen bg-blue-400"
          >
            {columnsOrder.map((columnId, index) => (
              <Column
                key={columnId}
                index={index}
                columnId={columnId}
                items={columns[columnId]}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                isDragDisabled={isDragDisabled}
                draggingItems={draggingItems}
              />
            ))}
            {provided.placeholder}
          </section>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
