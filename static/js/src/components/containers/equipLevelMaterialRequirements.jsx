import { connect } from 'react-redux';
import { sumMaps } from '../../utils/mapUtils.js';
import MaterialRequirement from '../../classes/MaterialRequirement.js';
import MaterialRequirements from '../presentations/materialRequirements.js';

const mapStateToProps = (state) => {
  const amountsById = new Map();
  
  for (var l = state.equipDataDisplay.lowerLevel; l < state.equipDataDisplay.higherLevel; l++) {
    const equip = state.equips.get(state.equipDataDisplay.equipId);
    const requirements = equip.levels.get(l).upgradeMaterialRequirements;
    requirements.forEach(requirement => {
      const matId = requirement.material.id;
      const totalSoFar = amountsById.has(matId) ? amountsById.get(matId) : 0;
      amountsById.set(matId, totalSoFar + requirement.amount);
    });
  }

  const totalRequirements = [...amountsById.entries()].map( entry => 
    new MaterialRequirement(state.materials.get(entry[0]), entry[1])
  );

  return {
    requirements: totalRequirements,
  };
};

const EquipLevelMaterialRequirements = connect(
  mapStateToProps,
)(MaterialRequirements);

export default EquipLevelMaterialRequirements;
