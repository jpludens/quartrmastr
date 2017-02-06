function getObjectValues(obj) {
  const values = [];
  for(let [key, value] of Object.entries(obj)) {
    values.push(value)
  };
  return values;
}

export default getObjectValues;
