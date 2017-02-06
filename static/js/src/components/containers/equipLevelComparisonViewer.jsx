import { connect } from 'react-redux';
import DATA_CATEGORIES from '../../constants/dataCategories.js';
import EquipLevelComparisonView from '../presentations/equipLevelComparisonView.jsx';

const mapStateToProps = (state) => {
  const selectedEquipId = state.equipDataDisplay.equipId;
  if (selectedEquipId == null) {
    return {
      equip: null,
    };
  }
  return {
    equip: state.equips.get(selectedEquipId),
    equipDataDisplay: state.equipDataDisplay,
  };
};

const EquipLevelComparisonViewer = connect(
  mapStateToProps,
)(EquipLevelComparisonView);

export default EquipLevelComparisonViewer;
