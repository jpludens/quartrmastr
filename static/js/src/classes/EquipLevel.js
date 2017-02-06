import ELEMENTS from '../constants/elements.js';
import STATS from '../constants/stats.js';
import STATUSES from '../constants/statuses.js';
import ElementalResistances from './ElementalResistances.js';
import Material from './Material.js';
import { materialRequirementFromObj } from './MaterialRequirement.js';
import Stats from './Stats.js';
import StatusResistances from './StatusResistances.js';

export default class EquipLevel {
  constructor(level, stats, upgradeMaterialRequirements,
    elementalResistances, statusResistances) {
    this.level = level;
    this.stats = stats;
    this.upgradeMaterialRequirements = upgradeMaterialRequirements,
    this.elementalResistances = elementalResistances,
    this.statusResistances = statusResistances
  }
}

const equipLevelFromObj = obj => {
  const upgradeMaterialRequirements = obj.upgradeMaterialRequirements
    ? obj.upgradeMaterialRequirements.map(umr =>
      materialRequirementFromObj(umr))
    : [];
  const elementalResistances = obj.elementalResistances
    ? new ElementalResistances().fromObj(obj.elementalResistances)
    : new ElementalResistances();
  const statusResistances = obj.statusResistances
    ? new StatusResistances().fromObj(obj.statusResistances)
    : new StatusResistances();

  return new EquipLevel(
    obj.level,
    new Stats().fromObj(obj.stats),
    upgradeMaterialRequirements,
    elementalResistances,
    statusResistances);
};

export { equipLevelFromObj }
