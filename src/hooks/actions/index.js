export const setCoordinatesData = (store, newCoordinatesData) => {
  const coordinatesData = newCoordinatesData;
  store.setState({ coordinatesData });
};