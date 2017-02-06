import { connect } from 'react-redux';
import StatsView from '../presentations/statsView.jsx';

const mapStateToProps = (state) => {
  let equip = state.equips.get(state.equipDataDisplay.equipId);
  let stats = equip.levels.get(state.equipDataDisplay.lowerLevel).stats;
  return {
    stats: stats,
    columns: 2,
  }
};

const EquipCurrentLevelStats = connect(
  mapStateToProps,
)(StatsView);

export default EquipCurrentLevelStats;
