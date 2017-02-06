import React from 'react';
import EquipLevel from '../../classes/EquipLevel.js';

const baseClass = "stats__value stats__value--";
const getValueSpan= (value) => {
  if (value > 0) {
    return(
      <span
        className={baseClass + "increase"}>
        +{value + '%'}
      </span>
    );
  }
  else if (value < 0) {
    return(
      <span
        className={baseClass + "decrease"}>
        -{Math.abs(value) + '%'}
      </span>
    );
  }
  else if (value == 0) {
    return(
      <span
        className={baseClass +"nocrease"}>
        +0%
      </span>
    );
  }
};

const getResistanceDiff = (key, value, type) => {
  return (
      <div className="resistance" key={key + type}>
        <div className="element__icon-container">
          <img
            className="element__icon"
            alt={key + " element icon"}
            src={"/images?image=" + type + "/" + key.toLowerCase() + ".png"}/>
        </div>
        {getValueSpan(value)}
      </div>
  );
};

const EquipLevelResistancesDiff = ({ higherEquipLevel, lowerEquipLevel }) => {
  const resistanceDiffs = [];

  const elementalResistancesDiff = higherEquipLevel.elementalResistances
    .subtract(lowerEquipLevel.elementalResistances);
  for(let [key, value] of elementalResistancesDiff.getNonZeroOnly().entries()) {
    resistanceDiffs.push(getResistanceDiff(key, value, "element"));
  };

  const statusResistancesDiff = higherEquipLevel.statusResistances
    .subtract(lowerEquipLevel.statusResistances);
  for(let [key, value] of statusResistancesDiff.getNonZeroOnly().entries()) {
    resistanceDiffs.push(getResistanceDiff(key, value, "status"));
  };

  return (
    <div className="flexrow">
      {resistanceDiffs}
    </div>
  );
};

EquipLevelResistancesDiff.propTypes = {
  higherEquipLevel: React.PropTypes.instanceOf(EquipLevel).isRequired,
  lowerEquipLevel: React.PropTypes.instanceOf(EquipLevel).isRequired,
};

export default EquipLevelResistancesDiff;
