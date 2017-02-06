import React from 'react';
import ReactDOM from 'react-dom';
import { loadCharacters } from './utils/loaderUtil';

loadCharacters().then(characters => {
  characters.forEach(character => {
    character.defaultOutfit = {
      weapon: null,
      hat: null,
      armor: null,
      accessories: [null, null, null]
    }

    character.equipSlots.forEach(equipSlot => {
      // Create an object for this filled slot
      let outfitElement = {
        slotName: equipSlot.slotName,
        equipName: null
      };
      // Assign the equip (name only for now)
      character.defaultEquips.forEach(defaultEquip => {
        if (defaultEquip.slotName == equipSlot.slotName) {
          outfitElement.equipName = defaultEquip.equipName;
        }
      });
      // Assign the slot object to the appropriate outfit property
      switch (equipSlot.slotType) {
        case "Weapon":
          character.defaultOutfit.weapon = outfitElement;
          break;
        case "Hat":
          character.defaultOutfit.hat = outfitElement;
          break;
        case "Armor":
          character.defaultOutfit.armor = outfitElement;
          break;
      }
    });
  });
  console.log(characters);
  
  ReactDOM.render(
    <CharacterRoster characters={characters} />,
    document.getElementById('characters')
  );
  ReactDOM.render(
    <p>Click a character to explore their outfits</p>,
    document.getElementById('wardrobe')
  );
});


class CharacterRoster extends React.Component {
  constructor(props) {
    super(props)

    let characterOutfits = new Map();
    let selectedOutfits = new Map();
    this.props.characters.forEach(c => {
      characterOutfits.set(c.name, [c.defaultOutfit]);
      selectedOutfits.set(c.name, c.defaultOutfit)
    })

    this.state = {
      characterOutfits: characterOutfits,
      selectedOutfits: selectedOutfits
    }
  }

  selectCharacter(character) {
    ReactDOM.render(
      <Wardrobe outfits={this.state.characterOutfits.get(character.name)}/>,
      document.getElementById('wardrobe'));
  }

  render() {
    return (
      <ul>
        {this.props.characters.map(c =>
          <li>
            <Character
              name={c.name}
              selectedOutfit={this.state.selectedOutfits.get(c.name)}
              outfits={this.state.characterOutfits.get(c.name)}
              selectCharacter={this.selectCharacter.bind(this, c)} />
          </li>
          )
        }
      </ul>
    )
  }
}
CharacterRoster.propTypes = {
  characters: React.PropTypes.array.isRequired
}

class Character extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    this.props.onClick(this.props.character);
  }

  render() {
    return (
      <div>
        <p onClick={this.props.selectCharacter} >
          {this.props.name}
        </p>
      </div>
    )
  }
}
Character.propTypes = {
  name: React.PropTypes.string.isRequired,
  outfits: React.PropTypes.array.isRequired
}

class Wardrobe extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    // display a button to add a new empty outfit
    // display a button a add a new RANDOM outfit
    // display the list of currently existing outfits
    return (
      <ul>
        {this.props.outfits.map(o => 
          <li>
            <Outfit outfit={o} />
          </li>
        )};
      </ul>

    );
  }
}
Wardrobe.propTypes = {
  outfits: React.PropTypes.array.isRequired
}




class Outfit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <p>Weapon: {this.props.outfit.weapon.equipName}</p>
        <p>Hat: {this.props.outfit.hat.equipName}</p>
        <p>Armor: {this.props.outfit.armor.equipName}</p>
      </div>
    )
  }
}
Outfit.propTypes = {
}


class EquipSlot extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <p>{this.props.slot}</p>;    
  }
}
EquipSlot.propTypes = {
  slot: React.PropTypes.string.isRequired
}
