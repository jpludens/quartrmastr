import React from 'react';
import Trait from '../../classes/Trait.js';
import TraitsArray from '../../classes/TraitsArray.js';

const EquipTraitsText = ({ traits }) => {
  return (
    <p>
      {traits.map((trait, index) => {
        let text = "Um...";
        const data = trait.data;
        switch (trait.type) {
          // Imbue
          case "Imbue":
            text = `Imbued with ${data.element}. `;
            break;

          // Boost
          case "Boost":
            text = data.element == null
              ? `Boosts the power of ${data.property}.`
              : `Boosts the power of ${data.element} Skills.`;
            break;

          // Sapper stuff
          case "Inflict":
            text = `May inflict ${data.status || data.property} on targets. `;
            break;
          case "ReplaceInflict":
            text = `Replaces weapon effect with ${data.status}. `;
            break;
          case "Debuff":
            text = `May debuff targets' ${data.stat}. `;
            break;
          case "Drain":
            text = `Drains ${data.stat} from foes with certain Skills. `;
            break;

          // Offensive stuff
          case "Combo":
            text = `May cast ${data.skillName} with certain Skills. `;
            break;
          case "Chrono":
            text = `Randomly casts ${data.skillName} between turns. `;
            break;
          case "Counter":
            text = `Counter attacks with ${data.skillName}. `;
            break;

          // Defensive stuff
          case "Bestow":
            text = `Randomly gives the player ${data.status} status. `;
            break;
          case "Rally":
            text = `Boosts ${data.stat} when hit with a powerful attack. `;
            break;
        }
        return <span key={index}>{text}  </span>
      })}
    </p>
  );
}

EquipTraitsText.propTypes = {
  traits: React.PropTypes.arrayOf(
    React.PropTypes.instanceOf(Trait)).isRequired,
};

export default EquipTraitsText;
