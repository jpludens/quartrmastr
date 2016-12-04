import React from 'react';
import EquipTraitsBlurb from 'components/EquipTraitsBlurb';
import EquipLevelSelector from 'components/EquipLevelSelector';
import EquipLevelComponent from 'components/EquipLevelComponent';
import EquipLevelComparisonComponent from 'components/EquipLevelComparisonComponent';

export default class EquipDetailsComponent extends React.Component {
  // TODO: Break this up
  constructor(props) {
    super(props);

    this.state = {
      currentLevel: 1,
      compareLevel: 2
    }
  }

  setCurrentLevel(newLevel) {
    // Set the new current level.
    this.setState({currentLevel: newLevel})
    // If the new level is at max, we can no longer compare.
    if (newLevel == this.props.equip.maxLevel) {
      this.setState({compareLevel: null});
    }
    // If compare level is null or too low, set it to one above current.
    else if ((this.state.compareLevel || 0) <= newLevel) {
      this.setState({compareLevel: newLevel + 1});
    }
  }

  setCompareLevel(compareLevel) {
    this.setState({compareLevel: compareLevel})
  }

  render() {
    return (
      <div>
        <h3>Details for {this.props.equip.name} ({this.props.equip.slot})</h3>
        <EquipTraitsBlurb traits={this.props.equip.traits} />
        <div>
          {this.renderCurrentLevel()}
          {this.renderDelta()}
          {this.renderCompareLevel()}
        </div>
      </div>
    );
  }

  renderCurrentLevel() {
    let levelData = this.props.equip.levels.get(this.state.currentLevel);
    return (
      <div id="current-level-details" className="column">
        <h4>Current Level</h4>
        <EquipLevelSelector
          min={1}
          max={this.props.equip.maxLevel}
          setter={this.setCurrentLevel.bind(this)} />
        <EquipLevelComponent
          level={this.state.currentLevel}
          stats={levelData.stats}
          eres={levelData.elementalResistances}
          sres={levelData.statusResistances} />
      </div>
    );
  }

  renderCompareLevel() {
    if (this.state.compareLevel) {
      let currentData = this.props.equip.levels.get(this.state.currentLevel);
      let compareData = this.props.equip.levels.get(this.state.compareLevel);
      return (
        <div id="compare-level-details" className="column">
          <h4>Compared to Level</h4>
          <EquipLevelSelector
            min={this.state.currentLevel + 1}
            max={this.props.equip.maxLevel}
            setter={this.setCompareLevel.bind(this)} />
          <EquipLevelComponent
            level={this.state.compareLevel}
            stats={compareData.stats}
            eres={compareData.elementalResistances}
            sres={compareData.statusResistances} />
        </div>
      );
    }
    else {
      return (
        <div id="compare-level-details" className="column">
          This Equip is maxed to the max!
        </div>
      );
    }
  }

  renderDelta() {
    if (this.state.compareLevel) {
      let currentData = this.props.equip.levels.get(this.state.currentLevel);
      let compareData = this.props.equip.levels.get(this.state.compareLevel);
      return (
        <EquipLevelComparisonComponent
          equip={this.props.equip}
          currentData={currentData}
          compareData={compareData} />
      );
    }
  }
}
EquipDetailsComponent.propTypes = {
  equip: React.PropTypes.object.isRequired
}