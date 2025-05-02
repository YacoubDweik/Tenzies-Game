function useData(maxNumberOfCards = 6, numberOfBoxes = 10) {
  let initialData = [];
  for (let i = 0; i < numberOfBoxes; i++) {
    initialData[i] = { id: i, value: 0, isSelected: false };
  }

  function rollData(array) {
    return array.map((item) =>
      !item.isSelected ? { ...item, value: Math.ceil(Math.random() * maxNumberOfCards) } : item
    );
  }

  let data = rollData(initialData);

  return { initialData, data, rollData };
}

export default useData;
