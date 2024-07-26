export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const reorderItems = ({ columns, source, destination }) => {
  const current = [...columns[source.droppableId]];
  const next = [...columns[destination.droppableId]];
  const target = current[source.index];

  if (source.droppableId === destination.droppableId) {
    const reordered = reorder(current, source.index, destination.index);

    const result = {
      ...columns,
      [source.droppableId]: reordered,
    };

    return {
      columns: result,
    };
  }

  if (current === next) {
    const reordered = reorder(current, source.index, destination.index);
    const result = {
      ...columns,
      [source.droppableId]: reordered,
    };
    return {
      columns: result,
    };
  }

  current.splice(source.index, 1);
  next.splice(destination.index, 0, target);

  const result = {
    ...columns,
    [source.droppableId]: current,
    [destination.droppableId]: next,
  };

  return {
    columns: result,
  };
};
