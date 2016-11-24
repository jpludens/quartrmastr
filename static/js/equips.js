
const requestInit = {
  method: 'GET',
  headers: {
   'Content-Type': 'application/json'
  }
};

const toJson = response => (response.json());
const loadData = Promise.all([
  fetch(new Request('/api/v1/equips/', requestInit)).then(toJson),
  fetch(new Request('/api/v1/materials/', requestInit)).then(toJson)]);

var materialCosts = new Map();
loadData.then(values => {
  // Extract the gold costs of each Material
  let materials = values[1];
  [...materials].forEach(material => {
    materialCosts.set(material.name, material.gold)
  });

  // Create equip objects and render the selector
  let equips = values[0].map(e => new Equip(e));
  ReactDOM.render(
    <ul>
      {equips.map(e => <li> <EquipPicker equip={e} /> </li> )}
    </ul>,
    document.getElementById('summaries')
  );

  // Render placeholder for details
  ReactDOM.render(
    <p>Click an Equip to view its details</p>,
    document.getElementById('details')
  );
});


class Equip {
  constructor(equipData) {
    this.name = equipData.equipName;
    this.slot = equipData.equipSlot;
    this.levelsData = equipData.levels;
    this.maxLevel = equipData.levels[equipData.levels.length-1].level
  }

  getStatsAtLevel(level) {
    return this.levelsData[level - 1].stats;
  }

  getUpgradeMaterialsAtLevel(level) {
    if (level < this.maxLevel) {
      return this.levelsData[level - 1].upgradeMaterials;
    }
  }
}


class EquipPicker extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <span onClick={this.handleClick.bind(this)}>
        {this.props.equip.name} ({this.props.equip.slot})
      </span>
    );
  }

  handleClick () {
    ReactDOM.render(
      <EquipDetails equip={this.props.equip}/>,
      document.getElementById('details')
    );
  }
}
EquipPicker.propTypes = {
  equip: React.PropTypes.object.isRequired
}


class EquipDetails extends React.Component {
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
    else if ((this.state.compareLevel || 0) <= newLevel) {
      this.setState({compareLevel: newLevel + 1});
    }
  }

  setCompareLevel(compareLevel) {
    this.setState({compareLevel: compareLevel})
  }

  render() {
    let compareLevelData = null;
    let statComparison = <p>This Equip is now beyond compare!</p>;
    let upgradeRequirements = <p>It cannae even be upgraded!</p>;

    let currentLevelData =
      <div>
        <h4>Current Level</h4>
        <EquipLevelSelector
          min={1}
          max={this.props.equip.maxLevel}
          setter={this.setCurrentLevel.bind(this)} />
        <EquipLevelData
          level={this.state.currentLevel}
          stats={this.props.equip.getStatsAtLevel(this.state.currentLevel)} />
      </div>;

    if (this.state.compareLevel) {
      compareLevelData =
        <div>
          <h4>Compared to Level</h4>
          <EquipLevelSelector
            min={this.state.currentLevel + 1}
            max={this.props.equip.maxLevel}
            setter={this.setCompareLevel.bind(this)} />
          <EquipLevelData
            level={this.state.compareLevel}
            stats={this.props.equip.getStatsAtLevel(this.state.compareLevel)} />
        </div>;

      let currentStats = this.props.equip.getStatsAtLevel(this.state.currentLevel);
      let compareStats = this.props.equip.getStatsAtLevel(this.state.compareLevel);
      statComparison =
        <div>
          <h4>Stats Difference</h4>
          {renderEquipStats(diffStats(compareStats, currentStats))}
        </div>;

      let upgradeMaterialsArray = [];
      for (let l = this.state.currentLevel; l < this.state.compareLevel; l++) {
        upgradeMaterialsArray.push(this.props.equip.getUpgradeMaterialsAtLevel(l));
      }
      let totalUpgradeMaterials = sumUpgradeMaterials(upgradeMaterialsArray);
      upgradeRequirements =
        <div>
          <h4>Total Upgrade Materials</h4>
          (Gold Cost: {getPriceForUpgradeMaterials(totalUpgradeMaterials)})
          {renderUpgradeMaterials(totalUpgradeMaterials)}
        </div>;
    }

    return (
      <div>
        <h3>Details for {this.props.equip.name}</h3>
        <p>{this.props.equip.slot}</p>
        <div id="details">
          {currentLevelData}
          <div>
            {statComparison}
            {upgradeRequirements}
          </div>
          {compareLevelData}
        </div>
      </div>
    );
  }
}
EquipDetails.propTypes = {
  equip: React.PropTypes.object.isRequired
}


class EquipLevelSelector extends React.Component {
  constructor(props) {
    super(props);
  }

  // This uses a bunch of magic to produce the right number of buttons
  // with the right labels and behaviors for all current use cases.
  render () {
    return (
      <div>
        {[...Array(this.props.max - this.props.min + 1).keys()].map(
          n =>
            <button onClick={() => this.props.setter(n + this.props.min)}>
              {n + this.props.min}
            </button>)}
      </div>
    );
  }
}
EquipLevelSelector.propTypes = {
  setter: React.PropTypes.func.isRequired,
  min: React.PropTypes.number.isRequired,
  max: React.PropTypes.number.isRequired
}


// Display stats, (effects), (resistances), and upgrade requirements.
class EquipLevelData extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let matsContent = null;
    if (this.props.mats) {
      matsContent =
        <div>
          <h4>Upgrade to Level {this.props.level+1}</h4>
          {renderUpgradeMaterials(this.props.mats)}
        </div>;
    }

    return (
      <div>
        <div>
          <h4>Stats at Level {this.props.level}</h4>
          {renderEquipStats(this.props.stats)}
        </div>
        {matsContent}
      </div>
    );
  }
}
EquipLevelData.propTypes = {
  level: React.PropTypes.number.isRequired,
  stats: React.PropTypes.object.isRequired,
  mats: React.PropTypes.object
}

// Stats stuff
const renderEquipStats = stats => (
  <ul>
    <li>Health Points: {stats.healthPoints}</li>
    <li>Magic Points: {stats.magicPoints}</li>
    <li>Physical Attack: {stats.physicalAttack}</li>
    <li>Magic Attack: {stats.magicAttack}</li>
    <li>Physical Defence: {stats.physicalDefence}</li>
    <li>Magic Defence: {stats.magicDefence}</li>
    <li>Accuracy: {stats.accuracy}</li>
    <li>Evade: {stats.evade}</li>
  </ul>
);

const diffStats = function (statsA, statsB) {
  let diff = {}
  for (let stat in statsA) {
    if (statsA.hasOwnProperty(stat)) {
      diff[stat] = statsA[stat] - statsB[stat];
    }
  }
  return diff;
}


// Upgrade Materials stuff
const renderUpgradeMaterials = upgradeMaterials => (
  <ul>
    {upgradeMaterials.map(um => renderUpgradeMaterial(um))}
  </ul>
);

const renderUpgradeMaterial = upgradeMaterial => (
  <li>
    {upgradeMaterial.materialName}: {upgradeMaterial.materialAmount}
  </li>
);

const sumUpgradeMaterials = upgradeMaterialsArray => {
  let totals = new Map();
  [...upgradeMaterialsArray].forEach(function(upgradeMaterials) {
    [...upgradeMaterials].forEach(function(upgradeMaterial) {
      // If this is a material that hasn't been seen, set a count for it to 0
      let name = upgradeMaterial.materialName;
      if (!totals.has(name)) {
        totals.set(name, {
            materialName: name,
            materialAmount: 0
        });
      }
      // Now add the amount for this material from this set
      totals.get(name).materialAmount += upgradeMaterial.materialAmount;
    });
  });
  return [...totals.values()];
};

const getPriceForUpgradeMaterials = upgradeMaterials => {
  let cost = 0;
  [...upgradeMaterials].forEach(material => {
    cost += material.materialAmount * materialCosts.get(material.materialName);
  })
  return cost;
}