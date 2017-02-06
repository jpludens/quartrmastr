import React, { PropTypes } from 'react';

function getButton(lvl, cls, clk) {
  if (clk) {
    return (
      <button
        key={lvl}
        className={cls}
        onClick={() => clk(lvl)}>
        {lvl}
      </button>
    );
  }
  else {
    return (
      <button
        key={lvl}
        className={cls}
        disabled="disabled">
        {lvl}
      </button>
    );
  }
}

const EquipLevelButtonRow = ({ max, min, current, onClick }) => {
  const buttons = [];
  for(let lvl = 1; lvl <= max; lvl++) {
    if (lvl == current) {
      buttons.push(getButton(lvl, "level-selector__level--current"));
    }
    else if (lvl < min) {
      buttons.push(getButton(lvl, "level-selector__level--inactive"));
    }
    else {
      buttons.push(getButton(lvl, "level-selector__level--active", onClick));
    }
  }

  return (
    <div className="flexrow">
      {buttons}
    </div>
  );
};

EquipLevelButtonRow.propTypes = {
  max: PropTypes.number.isRequired,
  min: PropTypes.number,
  current: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default EquipLevelButtonRow;
