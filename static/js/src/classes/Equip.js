import EquipLevel from 'classes/EquipLevel'

export default class Equip {
  constructor(equipData) {
    this.name = equipData.equipName;
    this.slot = equipData.equipSlot;
    this.traits = equipData.traits;

    this.levels = new Map();
    equipData.levels.forEach(rawLevelData => {
      this.levels.set(
        rawLevelData.level,
        new EquipLevel(rawLevelData, equipData)
      );
    });
    
    this.maxLevel = Math.max(...this.levels.keys());
  }
}
