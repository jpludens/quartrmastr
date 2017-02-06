import React from 'react';
import STATS from '../../constants/stats.js';
import Stats from '../../classes/Stats.js';

const baseClass = "stats__value"
const modClassIncrease = ' ' + baseClass + '--increase';
const modClassDecrease = ' ' + baseClass + '--decrease';
const modClassSame = ' ' + baseClass + '--nocrease';

const singleColumnOrder = [
  [
    STATS.HEALTH_POINTS,
    STATS.MAGIC_POINTS,
    STATS.ATTACK,
    STATS.DEFENCE,
    STATS.MAGIC_ATTACK,
    STATS.MAGIC_DEFENCE,
    STATS.ACCURACY,
    STATS.EVADE,
  ],
]

const doubleColumnOrder = [
  [
    STATS.HEALTH_POINTS,
    STATS.ATTACK,
    STATS.DEFENCE,
    STATS.ACCURACY,
  ],
  [
    STATS.MAGIC_POINTS,
    STATS.MAGIC_ATTACK,
    STATS.MAGIC_DEFENCE,
    STATS.EVADE,
  ],
]

const quadColumnOrder = [
  [
    STATS.HEALTH_POINTS,
    STATS.MAGIC_POINTS,
  ],
  [
    STATS.ATTACK,
    STATS.MAGIC_ATTACK,
  ],
  [
    STATS.DEFENCE,
    STATS.MAGIC_DEFENCE,
  ],
  [
    STATS.ACCURACY,
    STATS.EVADE,
  ],
]

const getValueSpan = (value) => ( 
  <span className={baseClass}>
    {value}
  </span>
);

const getDiffSpan = (value) => {
  if (value > 0) {
    return(
      <span
        className={baseClass + modClassIncrease}>
        +{value}
      </span>
    );
  }
  else if (value < 0) {
    return(
      <span
        className={baseClass + modClassDecrease}>
        -{Math.abs(value)}
      </span>
    );
  }
  else if (value == 0) {
    return(
      <span
        className={baseClass + modClassSame}>
        +0
      </span>
    );
  }
};

const getOrder = (columns) => {
  switch (columns) {
    case 2:
      return doubleColumnOrder;
    case 4:
      return quadColumnOrder;
    default:
      return singleColumnOrder;
  }
}

const StatsView = ({ stats, columns, asDiff }) => {
  const columnOrder = getOrder(columns);
  const spanner = asDiff ? getDiffSpan : getValueSpan;
  return (
    <div className="flexrow">
      {columnOrder.map(column => (
        <div className="flexcolumn">
          {column.map(stat => {
            const name = stat;
            const value = stats.get(stat);
            return (
              <div>
                <div className="stats__icon-container">
                  <img
                    className="stats__icon"
                    alt={name + " stat icon"}
                    src={"/images?image=stat/" + name.toLowerCase() + ".png"}/>
                </div>
                {spanner(value)}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

Stats.propTypes = {
  stats: React.PropTypes.instanceOf(Stats).isRequired,
  columns: React.PropTypes.number,
  asDiff: React.PropTypes.bool,
}

export default StatsView;
