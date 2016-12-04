import React from 'react';

export default class EquipTraitsBlurb extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ( 
      <p>
        {this.props.traits.map((trait, index) => { 
          let text = "Um...";
          switch (trait.traitType) {
            // Imbue
            case "imbueElement":
              text = `Imbued with ${trait.elementName}. `;
              break;

            // Boost
            case "boostElement":
              text = `Boosts the power of ${trait.elementName} Skills. `;
              break;
            case "actionBoost":
              text = `Boosts the power of ${trait.actionDesc}. `;
              break;
            case "stackSkill":
              text = `May cast ${trait.skillName} with certain Skills. `;
              break;
            case "drain":
              let stat = trait.statName == 'healthPoints' ? 'HP' : 'MP';
              text = `Drains ${stat} from foes with certain Skills. `;
              break;

            // Sapper stuff
            case "statusOnTarget":
              let status = trait.statusName == "Random" ? "random status effects" : trait.statusName
              text = `May inflict ${status} on targets. `;
              break;
            case "statusReplace":
              text = `Replaces weapon effect with ${trait.statusName}. `;
              break;
            case "statDebuff":
              text = `May slap targets with ${trait.statModifierName}. `;
              break;

            // Offensive stuff
            case "beatSkill":
              text = `Randomly casts ${trait.skillName} between turns. `;
              break;
            case "counterSkill":
              text = `Counter attacks with ${trait.skillName}. `;
              break;

            // Defensive stuff
            case "statusOnPlayer":
              text = `Randomly gives the player ${trait.statusName}. `;
              break;
            case "buffReflex":
              text = `Grants player ${trait.statModifierName} when hit with a powerful attack. `;
              break;
          }
          return <span key={index}>{text}</span>
        })}
      </p>
    );
  }
}
EquipTraitsBlurb.propTypes = {
  traits: React.PropTypes.array.isRequired
}
