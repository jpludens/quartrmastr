import React from 'react';
import EquipSelectorFilter from 'components/EquipSelectorFilter';
import EquipSelectorListing from 'components/EquipSelectorListing';

export default class EquipSelector extends React.Component {
  constructor(props) {
    super(props);

    let slots = new Set();
    slots.add("Bow");
    slots.add("Sword");
    slots.add("Staff");
    slots.add("Gun");
    slots.add("Female Hats");
    slots.add("Female Armor");
    slots.add("Male Hats");
    slots.add("Male Armor");
    slots.add("Flair");
    this.state = {
      showSlots: slots
    }
  }

  setSlots(slots) {
    this.setState({showSlots: slots})
  }

  render() {
    // Make a list of equips to show based on set of slots
    var slots = this.state.showSlots;
    let equipsToShow = this.props.equips.filter(function(equip) {
      return slots.has(equip.slot);
    });
    let listings = equipsToShow.map(equip => {
      return (
        <li key={equip.name} >
          <EquipSelectorListing equip={equip} />
        </li>
      );
    });

    // Render the filter and the list of equips
    return (
      <div>
        <EquipSelectorFilter setSlots={this.setSlots.bind(this)} />
        <ul>
          {listings}
        </ul>
      </div>
    );
  }
}
EquipSelector.propTypes = {
  equips: React.PropTypes.array.isRequired
}
