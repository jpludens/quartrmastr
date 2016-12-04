import React from 'react';
import { diffStats, renderEquipStats, renderMapAsUnorderedList, getPriceForUpgradeMaterials } from 'utils/equipUtils';
import { diffMaps, sumMaps } from 'utils/mapUtils';

export default class EquipLevelComparisonComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const statComparison =
      <div>
        <h4>Stats Changes</h4>
        {renderEquipStats(diffStats(
          this.props.compareData.stats, this.props.currentData.stats))}
      </div>;

    const elementalComparison =
      <div>
        <h4>Elemental Resistance Changes</h4>
        {renderMapAsUnorderedList(diffMaps(
          this.props.compareData.elementalResistances,
          this.props.currentData.elementalResistances))}
      </div>

    const statusComparison =
      <div>
        <h4>Status Resistance Changes</h4>
        {renderMapAsUnorderedList(diffMaps(
          this.props.compareData.statusResistances,
          this.props.currentData.statusResistances))}
      </div>

    let upgradeMaterialsArray = [];
    for (let l = this.props.currentData.level; l < this.props.compareData.level; l++) {
      upgradeMaterialsArray.push(this.props.equip.levels.get(l).upgradeMaterials);
    }
    let totalUpgradeMaterials = sumMaps(upgradeMaterialsArray);
    const upgradeRequirements =
      <div>
        <h4>Total Upgrade Materials</h4>
        (Gold Cost: {getPriceForUpgradeMaterials(totalUpgradeMaterials)})
        {renderMapAsUnorderedList(totalUpgradeMaterials)}
      </div>;

    return (
      <div id="delta" className="column">
        {statComparison}
        {elementalComparison}
        {statusComparison}
        {upgradeRequirements}
      </div>
    );
  }
}
EquipLevelComparisonComponent.propTypes = {
  // TODO: Drop requirement when comparing between different Equips
  equip: React.PropTypes.object.isRequired,
  currentData: React.PropTypes.object.isRequired,
  compareData: React.PropTypes.object.isRequired
}
