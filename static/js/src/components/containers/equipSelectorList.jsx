import { connect } from 'react-redux';
import ActiveList from '../presentations/activeList.jsx';
import DATA_CATEGORIES from '../../constants/dataCategories.js';
import EQUIP_FILTER_CATEGORIES from '../../constants/equipFilterCategories.js';
import setEquipDataDisplayEquipId from '../../actions/setEquipDataDisplayEquipId.js';


const filters = new Map();
filters.set(EQUIP_FILTER_CATEGORIES.ALL_EQUIPS,
            equip => true);
filters.set(EQUIP_FILTER_CATEGORIES.WEAPONS,
            equip => equip.type == "Weapon");
filters.set(EQUIP_FILTER_CATEGORIES.BOWS,
            equip => equip.slot == "Bow");
filters.set(EQUIP_FILTER_CATEGORIES.SWORDS,
            equip => equip.slot == "Sword");
filters.set(EQUIP_FILTER_CATEGORIES.STAVES,
            equip => equip.slot == "Staff");
filters.set(EQUIP_FILTER_CATEGORIES.GUNS,
            equip => equip.slot == "Gun");
filters.set(EQUIP_FILTER_CATEGORIES.ARMOR,
            equip => equip.type != "Weapon");
filters.set(EQUIP_FILTER_CATEGORIES.FEMALE_HATS,
            equip => equip.slot == "Female Hat");
filters.set(EQUIP_FILTER_CATEGORIES.FEMALE_ARMOR,
            equip => equip.slot == "Female Armor");
filters.set(EQUIP_FILTER_CATEGORIES.MALE_HATS,
            equip => equip.slot == "Male Hat");
filters.set(EQUIP_FILTER_CATEGORIES.MALE_ARMOR,
            equip => equip.slot == "Male Armor");
filters.set(EQUIP_FILTER_CATEGORIES.FLAIR,
            equip => equip.slot == "Flair");

const mapStateToProps = (state) => {
  const filter = filters.get(state.equipFilterCategory);
  const filteredEquips = [...state.equips.values()].filter(filter);
  return {
    items: filteredEquips.map(e => {
      return {
        id: e.id,
        text: e.name + ' (' + e.slot + ')',
      }
    }),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (equipId) => {
      dispatch(setEquipDataDisplayEquipId(equipId))
    }
  }
};

const EquipSelectorList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActiveList);

export default EquipSelectorList;
