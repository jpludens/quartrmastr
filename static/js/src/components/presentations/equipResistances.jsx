import React from 'react';
import ElementalResistances from '../../classes/ElementalResistances.js';
import StatusResistances from '../../classes/StatusResistances.js';

const getResistance = (key, value, type) => {
  return (
      <div className="resistance" key={key + type}>
        <div className="element__icon-container">
          <img
            className="element__icon"
            alt={key + " element icon"}
            src={"/images?image=" + type + "/" + key.toLowerCase() + ".png"}/>
        </div>
        <span className="stats__value">{value + "%"}</span>
      </div>
  );
};

const EquipResistances = ({ elementalResistances, statusResistances }) => {
  const resistances = [];

  for(let [key, value] of elementalResistances.getNonZeroOnly().entries()) {
    resistances.push(getResistance(key, value, "element"));
  };

  for(let [key, value] of statusResistances.getNonZeroOnly().entries()) {
    resistances.push(getResistance(key, value, "status"));
  };

  return (
    <div className="flexrow">
      {resistances}
    </div>
  );
};

EquipResistances.propTypes = {
  elementalResistances: React.PropTypes.instanceOf(ElementalResistances),
  statusResistances: React.PropTypes.instanceOf(StatusResistances),
};

export default EquipResistances;
