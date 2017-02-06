import { connect } from 'react-redux';
import EquipTraitsText from '../presentations/equipTraitsText.js';

const mapStateToProps = (state) => {
  return {
    traits: state.equips.get(state.equipDataDisplay.equipId).traits,
  }
};

const EquipTraitsTextViewer = connect(
  mapStateToProps,
)(EquipTraitsText);

export default EquipTraitsTextViewer;
