import { connect } from 'react-redux';
import ActiveDropdown from '../presentations/activeDropdown.jsx';
import EQUIP_FILTER_CATEGORIES from '../../constants/equipFilterCategories.js';
import setEquipFilterCategory from '../../actions/setEquipFilterCategory.js';

const categoryText = new Map();
categoryText.set(EQUIP_FILTER_CATEGORIES.ALL_EQUIPS, 'Show All Equips');
categoryText.set(EQUIP_FILTER_CATEGORIES.WEAPONS, 'Show All Weapons');
categoryText.set(EQUIP_FILTER_CATEGORIES.BOWS, 'Show Only Bows');
categoryText.set(EQUIP_FILTER_CATEGORIES.SWORDS, 'Show Only Swords');
categoryText.set(EQUIP_FILTER_CATEGORIES.STAVES, 'Show Only Staves');
categoryText.set(EQUIP_FILTER_CATEGORIES.GUNS, 'Show Only Guns');
categoryText.set(EQUIP_FILTER_CATEGORIES.ARMOR, 'Show All Armor');
categoryText.set(EQUIP_FILTER_CATEGORIES.FEMALE_HATS, 'Show Only Female Hats');
categoryText.set(EQUIP_FILTER_CATEGORIES.FEMALE_ARMOR, 'Show Only Female Armor');
categoryText.set(EQUIP_FILTER_CATEGORIES.MALE_HATS, 'Show Only Male Hats');
categoryText.set(EQUIP_FILTER_CATEGORIES.MALE_ARMOR, 'Show Only Male Armor');
categoryText.set(EQUIP_FILTER_CATEGORIES.FLAIR, 'Show Only Flair');

const mapStateToProps = (state) => {
  return {
    options: categoryText,
    defaultValue: EQUIP_FILTER_CATEGORIES.ALL_EQUIPS,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (event) => {
      dispatch(setEquipFilterCategory(event.target.value))
    }
  }
};

const EquipCategoryDropdown = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveDropdown);

export default EquipCategoryDropdown;
