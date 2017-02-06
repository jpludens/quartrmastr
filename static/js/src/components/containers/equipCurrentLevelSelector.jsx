import { connect } from 'react-redux';
import EquipLevelButtonRow from '../presentations/equipLevelButtonRow.jsx';
import setEquipDataDisplayLowerLevel from '../../actions/setEquipDataDisplayLowerLevel.js';
import setEquipDataDisplayHigherLevel from '../../actions/setEquipDataDisplayHigherLevel.js';

const mapStateToProps = (state) => {
  return {
    max: state.equips.get(state.equipDataDisplay.equipId).maxLevel,
    current: state.equipDataDisplay.lowerLevel,
  }
};

const doSetDataDisplay = (clickedLevel) => {
  return (dispatch, getState) => {
    // Always set the current level to the one clicked
    dispatch(setEquipDataDisplayLowerLevel(clickedLevel));

    // Make sure compareLevel exceeds currentLevel
    const state = getState();
    const display = state.equipDataDisplay;
    const compareLevel = display.higherLevel;
    if (clickedLevel >= compareLevel) {
      dispatch(setEquipDataDisplayHigherLevel(clickedLevel + 1));
    }
    // "Retrieve from the void"
    else {
      const maxLevel = state.equips.get(display.equipId).maxLevel;
      if (compareLevel > maxLevel) {
        dispatch(setEquipDataDisplayHigherLevel(maxLevel));
      } 
    }
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (clickedLevel) => {
      dispatch(doSetDataDisplay(clickedLevel));
    }
  }
};

const EquipCurrentLevelSelector = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EquipLevelButtonRow);

export default EquipCurrentLevelSelector;
