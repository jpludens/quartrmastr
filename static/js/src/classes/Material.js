export default class Material {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

const materialFromObj = obj =>
  new Material(obj.id, obj.name, obj.price);

export { materialFromObj }
