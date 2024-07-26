import React, { useCallback, useState } from "react";
import { getColumns } from "../mocks/mockData.js";
import { reorder, reorderItems } from "../utils/reorder.js";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import "../index.css";
import Column from "./Column.jsx";

function Board() {
  const [columns, setColumns] = useState(getColumns(4));
  const [columnsOrder, setColumnsOrder] = useState(Object.keys(columns));

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
        source,
        destination,
      });

      setColumns(data.columns);
    },
    [columns, columnsOrder]
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
