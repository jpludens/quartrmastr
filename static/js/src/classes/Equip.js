import { equipLevelFromObj } from '../classes/EquipLevel.js';
import { traitFromObj } from '../classes/Trait.js';
import TraitsArray from '../classes/TraitsArray.js';

export default class Equip {
  constructor(id, name, slot, type, traits, levels) {
    this.id = id;
    this.name = name;
    this.slot = slot;
    this.type = type;
    this.traits = traits;
    this.levels = levels;
    this.maxLevel = Math.max(...this.levels.keys());
  }
}

const equipFromObj = obj => {
  const levels = new Map();
  obj.levels.forEach(l => {
    levels.set(l.level, equipLevelFromObj(l));
  });
  return new Equip(
    obj.id,
    obj.name,
    obj.slot,
    obj.type,
    new TraitsArray(obj.traits.map(traitObj => 
      traitFromObj(traitObj))),
    levels);
}

export { equipFromObj }
