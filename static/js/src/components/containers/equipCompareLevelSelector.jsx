import { connect } from 'react-redux';
import EquipLevelButtonRow from '../presentations/equipLevelButtonRow.jsx';
import setEquipDataDisplayHigherLevel from '../../actions/setEquipDataDisplayHigherLevel.js';

const mapStateToProps = (state) => {
  return {
    max: state.equips.get(state.equipDataDisplay.equipId).maxLevel,
    min: state.equipDataDisplay.lowerLevel + 1,
    current: state.equipDataDisplay.higherLevel,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (clickedLevel) => {
      dispatch(setEquipDataDisplayHigherLevel(clickedLevel));
    }
  }
};

const EquipCompareLevelSelector = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EquipLevelButtonRow);

export default EquipCompareLevelSelector;
