const getUniqueId = () => Math.random().toString(16).slice(2);

const getItems = (count) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}-${getUniqueId()}`,
    content: `item ${k}`,
  }));

export const getColumns = (count) => {
  return Array.from({ length: count }).reduce((columnsList, _, i) => {
    const columnId = `column-${i}`;
    columnsList[columnId] = getItems(10);
    return columnsList;
  }, {});
};
