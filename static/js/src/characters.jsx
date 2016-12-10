
console.log("characters.jsx");
import React from 'react';
import ReactDOM from 'react-dom';
import { loadCharacters } from 'utils/loaderUtil'
loadCharacters().then(characters => {
  console.log(characters);
  ReactDOM.render(
    <CharacterRoster characters={characters} />,
    document.getElementById('content')
  );
});

class CharacterRoster extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ul>
        {this.props.characters.map(c=> 
          <li>
            <Character
              name={c.name}
              equipSlots={c.equipSlots} />
          </li>)}
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

  render() {
    return (
      <div>
        <p>{this.props.name}</p>
        <Outfit equipSlots={this.props.equipSlots} />
      </div>
    )
  }
}
Character.propTypes = {
  name: React.PropTypes.string.isRequired,
  equipSlots: React.PropTypes.array.isRequired  
}


class Outfit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <ul>
        {this.props.equipSlots.map(es =>
          <li>
            <EquipSlot slot={es} />
          </li>)}
      </ul>
    )
  }
}
Outfit.propTypes = {
  equipSlots: React.PropTypes.array.isRequired  
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
