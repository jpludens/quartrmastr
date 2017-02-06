import { connect } from 'react-redux';
import StatsView from '../presentations/statsView.jsx';

const mapStateToProps = (state) => {
  let equip = state.equips.get(state.equipDataDisplay.equipId);
  let lowerStats = equip.levels.get(state.equipDataDisplay.lowerLevel).stats;
  let higherStats = equip.levels.get(state.equipDataDisplay.higherLevel).stats;
  return {
    stats: higherStats.subtract(lowerStats),
    columns: 2,
    asDiff: true,
  }
};

const EquipLevelStatsDiff = connect(
  mapStateToProps,
)(StatsView);

export default EquipLevelStatsDiff;
