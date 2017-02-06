export default class Trait {
  constructor(type, data) {
    this.type = type;
    this.data = data;
  }
}

const traitFromObj = obj => {
  const data = {};
  for (let [key, value] of Object.entries(obj)) {
    if (key != "traitType") {
      data[key] = value;
    }
  }
  return new Trait(obj.traitType, data)
}

export { traitFromObj }
