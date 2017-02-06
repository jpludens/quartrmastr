import { connect } from 'react-redux';
import EquipLevelResistancesDiff from '../presentations/equipLevelResistancesDiff.jsx';

const mapStateToProps = (state) => {
  let equip = state.equips.get(state.equipDataDisplay.equipId);
  let equipLevel = equip.levels.get(state.equipDataDisplay.lowerLevel);
  return {
    lowerEquipLevel: equip.levels.get(state.equipDataDisplay.lowerLevel),
    higherEquipLevel: equip.levels.get(state.equipDataDisplay.higherLevel),
  }
};

const EquipLevelResistancesDiffViewer = connect(
  mapStateToProps,
)(EquipLevelResistancesDiff);

export default EquipLevelResistancesDiffViewer;
