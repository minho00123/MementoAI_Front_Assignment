import React, { useCallback, useState } from "react";
import { getColumns } from "../mocks/mockData.js";
import { reorder, reorderItems } from "../utils/reorder.js";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import "../index.css";
import Column from "./Column.jsx";

function Board() {
  const [columns, setColumns] = useState(getColumns(4));
  const [columnsOrder, setColumnsOrder] = useState(Object.keys(columns));
  const [dropColumn, setDropColumn] = useState("");
  const [dragItemId, setDragItemId] = useState("");

  const onDragEnd = useCallback(
    (result) => {
      const { source, destination, type } = result;

      if (!destination) {
        return;
      }

      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      ) {
        return;
      }

      if (
        source.droppableId === columnsOrder[0] &&
        destination.droppableId === columnsOrder[2]
      ) {
        return;
      }

      if (source.index % 2 === 1 && destination.index % 2 === 0) {
        return;
      }
      if (type === "COLUMN") {
        const newColumnsOrder = reorder(
          columnsOrder,
          source.index,
          destination.index
        );

        setColumnsOrder(newColumnsOrder);

        return;
      }

      const data = reorderItems({
        columns: columns,
        columnsOrder,
        source,
        destination,
      });

      setColumns(data.columns);
    },
    [columns, columnsOrder, dropColumn, dragItemId]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="column" type="COLUMN" direction="horizontal">
        {(provided) => (
          <section
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex justify-center items-center h-screen"
          >
            {columnsOrder.map((columnId, index) => (
              <Column
                key={columnId}
                index={index}
                columnId={columnId}
                items={columns[columnId]}
                dropColumn={dropColumn}
                dragItemId={dragItemId}
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
