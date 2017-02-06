import { connect } from 'react-redux';
import EquipResistances from '../presentations/equipResistances.jsx';

const mapStateToProps = (state) => {
  let equip = state.equips.get(state.equipDataDisplay.equipId);
  let equipLevel = equip.levels.get(state.equipDataDisplay.higherLevel);
  return {
    elementalResistances: equipLevel.elementalResistances,
    statusResistances: equipLevel.statusResistances,
  }
};

const EquipCurrentLevelResistances = connect(
  mapStateToProps,
)(EquipResistances);

export default EquipCurrentLevelResistances;
