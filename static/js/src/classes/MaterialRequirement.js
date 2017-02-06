import { materialFromObj } from './Material.js';

export default class MaterialRequirement {
  constructor(material, amount) {
    this.material = material;
    this.amount = amount;
  }
}

const materialRequirementFromObj = obj =>
  new MaterialRequirement(
    materialFromObj(obj.material),
    obj.amount);
export { materialRequirementFromObj }
