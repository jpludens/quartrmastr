import React from 'react';
import Equip from '../../classes/Equip.js';
import EquipTraitsTextViewer from '../containers/equipTraitsTextViewer.jsx';
import EquipCurrentLevelSelector from '../containers/equipCurrentLevelSelector.jsx';
import EquipCurrentLevelStats from '../containers/equipCurrentLevelStats.jsx';
import EquipCurrentLevelResistances from '../containers/equipCurrentLevelResistances.jsx';
import EquipLevelStatsDiff from '../containers/equipLevelStatsDiff.jsx';
import EquipLevelResistancesDiffViewer from '../containers/equipLevelResistancesDiffViewer.jsx';
import EquipLevelMaterialRequirements from '../containers/equipLevelMaterialRequirements.jsx';
import EquipCompareLevelSelector from '../containers/equipCompareLevelSelector.jsx';
import EquipCompareLevelStats from '../containers/equipCompareLevelStats.jsx';
import EquipCompareLevelResistances from '../containers/equipCompareLevelResistances.jsx';

const EquipLevelComparisonView = ({ equip, equipDataDisplay }) => {
  if (equip) {
    if (equipDataDisplay.lowerLevel != equip.maxLevel) {
      return (
        <div className="flexcolumn">
          <h2 id="selected-equip-name">{equip.name + ' (' + equip.slot + ')'}</h2>
          <EquipTraitsTextViewer />
          <div className="flexrow">
            <div className="flexcolumn">
              <EquipCurrentLevelSelector />
              <EquipCurrentLevelStats />
              <EquipCurrentLevelResistances />
            </div>
            <div className="flexcolumn">
              <span className="equip-diff-column-spacer"></span>
              <EquipLevelStatsDiff />
              <EquipLevelResistancesDiffViewer />
              <EquipLevelMaterialRequirements />
            </div>
            <div className="flexcolumn">
              <EquipCompareLevelSelector />
              <EquipCompareLevelStats />
              <EquipCompareLevelResistances />
            </div>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="flexcolumn">
          <h2 id="selected-equip-name">{equip.name + ' (' + equip.slot + ')'}</h2>
          <EquipTraitsTextViewer />
          <div className="flexrow">
            <div className="flexcolumn">
              <EquipCurrentLevelSelector />
              <EquipCurrentLevelStats />
              <EquipCurrentLevelResistances />
            </div>
            <div className="flexcolumn">
              <span className="equip-diff-column-spacer"></span>
              <p className="equip-maxed-notice">This Equip is maxed!</p>
            </div>
            <div className="flexcolumn">
              <EquipCompareLevelSelector />
            </div>
          </div>
        </div>
      );
    }

  }
  else {
    return (
      <div className="flexcolumn">
        <p>Click an Equip to view its details</p>
      </div>
    ); 
  }
}
EquipLevelComparisonView.propTypes = {
  equip: React.PropTypes.instanceOf(Equip),
};

export default EquipLevelComparisonView;
