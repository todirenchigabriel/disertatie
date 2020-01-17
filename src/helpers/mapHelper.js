const getMapObject = (id, value) => {
  let stringId = id >= 10 ? `${id}` : `0${id}`;
  return {
    id: stringId,
    value
  };
};
