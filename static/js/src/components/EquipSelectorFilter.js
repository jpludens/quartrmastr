import React from 'react';

export default class EquipSelectorFilter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Render a dropdown for selecting equip categories
    return (
      <select onChange={this.handleChange.bind(this)} defaultValue="All">
        <option value="All">Show All Equips</option>
        <option value="Weapon">Show All Weapons</option>
        <option value="Bow">Bows Only</option>
        <option value="Sword">Swords Only</option>
        <option value="Staff">Staves Only</option>
        <option value="Gun">Guns Only</option>
        <option value="Armor">All Armors</option>
        <option value="Female Hat">Female Hats Only</option>
        <option value="Female Armor">Female Armor Only</option>
        <option value="Male Hat">Male Hats Only</option>
        <option value="Male Armor">Male Armor Only</option>
        <option value="Flair">Flair Only</option>
      </select>
    );
  }

  handleChange(event) {
    // Make a set of base-level categories based on the dropdown selection,
    // and report that set through the props.setSlots function.
    let slots = new Set();

    switch (event.target.value) {
      case "Weapon":
        slots.add("Bow");
        slots.add("Sword");
        slots.add("Staff");
        slots.add("Gun");
        break;
      case "Bow":
        slots.add("Bow");
        break;
      case "Sword":
        slots.add("Sword");
        break;
      case "Staff":
        slots.add("Staff");
        break;
      case "Gun":
        slots.add("Gun");
        break;
      case "Female Hat":
        slots.add("Female Hat");
        break;
      case "Female Armor":
        slots.add("Female Armor");
        break;
      case "Male Hat":
        slots.add("Male Hat");
        break;
      case "Male Armor":
        slots.add("Male Armor");
        break;
      case "Armor":
        slots.add("Female Hat");
        slots.add("Female Armor");
        slots.add("Male Hat");
        slots.add("Male Armor");
      case "Flair":
        slots.add("Flair");
        break;
      default:
        slots.add("Bow");
        slots.add("Sword");
        slots.add("Staff");
        slots.add("Gun");
        slots.add("Female Hat");
        slots.add("Female Armor");
        slots.add("Male Hat");
        slots.add("Male Armor");
        slots.add("Flair"); ;
    }
    this.props.setSlots(slots)
  }
}