
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
    <EquipSelector equips={equips} />,
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
    this.traits = equipData.traits;

    this.levels = new Map();
    equipData.levels.forEach(rawLevelData => {
      this.levels.set(
        rawLevelData.level,
        new EquipLevel(rawLevelData, equipData)
      );
    });
    
    this.maxLevel = Math.max(...this.levels.keys());
  }
}


class EquipLevel {
  constructor(rawLevelData, equipData) {
    this.level = rawLevelData.level;
    this.stats = rawLevelData.stats;

    this.upgradeMaterials = new Map();
    if (rawLevelData.hasOwnProperty("upgradeMaterials")) {
      rawLevelData.upgradeMaterials.forEach(um => {
        this.upgradeMaterials.set(um.materialName, um.materialAmount);
      })
    }

    const resistanceValues = {
      '10per': { 1:  10, 2:  20, 3:  30, 4:  40, 5:   50 },
      '20per': { 1:  20, 2:  40, 3:  60, 4:  80, 5:  100 },
      '30neg': { 1: -30, 2: -30, 3: -30, 4: -30, 5:  -30 },
      '50neg': { 1: -50, 2: -50, 3: -50, 4: -50, 5:  -50 },
      'ftrip': { 1:  10, 2:  10, 3:  30 },
      'fhalf': { 1:  20, 2:  35, 3:  50 },
      'ffull': { 1:  40, 2:  70, 3: 100 }
    }

    this.elementalResistances = new Map();
    if (equipData.hasOwnProperty("elementalResistances")) {
      equipData.elementalResistances.forEach(r => {
        this.elementalResistances.set(
          r.elementName,
          resistanceValues[r.scheme][this.level]);
      });
    }

    this.statusResistances = new Map();
    if (equipData.hasOwnProperty("ailmentResistances")) {
      equipData.ailmentResistances.forEach(r => {
        this.statusResistances.set(
          r.ailmentName,
          resistanceValues[r.scheme][this.level]);
      });
    }
  }
}


class EquipSelector extends React.Component {
  constructor(props) {
    super(props);

    let slots = new Set();
    slots.add("Bow");
    slots.add("Sword");
    slots.add("Staff");
    slots.add("Gun");
    slots.add("Female Hats");
    slots.add("Female Armor");
    slots.add("Male Hats");
    slots.add("Male Armor");
    slots.add("Flair");
    this.state = {
      showSlots: slots
    }
  }

  setSlots(slots) {
    this.setState({showSlots: slots})
  }

  render() {
    var slots = this.state.showSlots;
    let equipsToShow = this.props.equips.filter(function(equip) {
      return slots.has(equip.slot);
    });
    let listings = equipsToShow.map(equip => {
      return (
        <li>
          <EquipSelectorListing equip={equip} />
        </li>
      );
    });

    return (
      <div>
        <EquipSelectorFilter setSlots={this.setSlots.bind(this)} />
        <ul>
          {listings}
        </ul>
      </div>
    );
  }
}
EquipSelector.propTypes = {
  filter: React.PropTypes.object.isRequired,
  equips: React.PropTypes.array.isRequired
}


class EquipSelectorFilter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <select onChange={this.handleChange.bind(this)}>
        <option selected value="All">Show All Equips</option>
        <option value="Weapon">Show All Weapons</option>
        <option value="Bow">Bows Only</option>
        <option value="Sword">Swords Only</option>
        <option value="Staff">Staves Only</option>
        <option value="Gun">Guns Only</option>
        <option value="Armor">All Armors</option>
        <option value="Female Hat">Female Hats Only</option>
        <option value="Female Armor">Female Armor Only</option>
        <option value="Male Hat">Male Hats Only</option>
        <option value="Male Armor">Male Armor Only</option>
        <option value="Flair">Flair Only</option>
      </select>
    );
  }

  handleChange(event) {
    let slots = new Set();

    switch (event.target.value) {
      case "Weapon":
        slots.add("Bow");
        slots.add("Sword");
        slots.add("Staff");
        slots.add("Gun");
        break;
      case "Bow":
        slots.add("Bow");
        break;
      case "Sword":
        slots.add("Sword");
        break;
      case "Staff":
        slots.add("Staff");
        break;
      case "Gun":
        slots.add("Gun");
        break;
      case "Female Hat":
        slots.add("Female Hat");
        break;
      case "Female Armor":
        slots.add("Female Armor");
        break;
      case "Male Hat":
        slots.add("Male Hat");
        break;
      case "Male Armor":
        slots.add("Male Armor");
        break;
      case "Armor":
        slots.add("Female Hat");
        slots.add("Female Armor");
        slots.add("Male Hat");
        slots.add("Male Armor");
      case "Flair":
        slots.add("Flair");
        break;
      default:
        slots.add("Bow");
        slots.add("Sword");
        slots.add("Staff");
        slots.add("Gun");
        slots.add("Female Hat");
        slots.add("Female Armor");
        slots.add("Male Hat");
        slots.add("Male Armor");
        slots.add("Flair"); ;
    }
    this.props.setSlots(slots)
  }
}


class EquipSelectorListing extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <span
        className="equip-selector-listing"
        onClick={this.handleClick.bind(this)}>
        {this.props.equip.name} ({this.props.equip.slot})
      </span>
    );
  }

  handleClick () {
    ReactDOM.render(
      <EquipDetailsComponent equip={this.props.equip}/>,
      document.getElementById('details')
    );
  }
}
EquipSelectorListing.propTypes = {
  equip: React.PropTypes.object.isRequired
}


class EquipDetailsComponent extends React.Component {
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
    let comparisonContent = null;
    let compareLevelContent = null;

    let currentLevelData = this.props.equip.levels.get(this.state.currentLevel);
    let currentLevelContent =
      <div>
        <h4>Current Level</h4>
        <EquipLevelSelector
          min={1}
          max={this.props.equip.maxLevel}
          setter={this.setCurrentLevel.bind(this)} />
        <EquipLevelComponent
          level={this.state.currentLevel}
          stats={currentLevelData.stats}
          eres={currentLevelData.elementalResistances}
          sres={currentLevelData.statusResistances} />
      </div>;

    if (this.state.compareLevel) {
      let compareLevelData = this.props.equip.levels.get(this.state.compareLevel);
      comparisonContent =
        <EquipLevelComparisonComponent
          equip={this.props.equip}
          currentData={currentLevelData}
          compareData={compareLevelData} />

      compareLevelContent =
        <div>
          <h4>Compared to Level</h4>
          <EquipLevelSelector
            min={this.state.currentLevel + 1}
            max={this.props.equip.maxLevel}
            setter={this.setCompareLevel.bind(this)} />
          <EquipLevelComponent
            level={this.state.compareLevel}
            stats={compareLevelData.stats}
            eres={compareLevelData.elementalResistances}
            sres={compareLevelData.statusResistances} />
        </div>;
    }

    return (
      <div>
        <h3>Details for {this.props.equip.name} ({this.props.equip.slot})</h3>
        <EquipTraitsBlurb traits={this.props.equip.traits} />
        <div id="details">
          {currentLevelContent}
          {comparisonContent}
          {compareLevelContent}
        </div>
      </div>
    );
  }
}
EquipDetailsComponent.propTypes = {
  equip: React.PropTypes.object.isRequired
}


class EquipTraitsBlurb extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return ( 
      <p>
        {this.props.traits.map(trait => {
          switch (trait.traitType) {
            case "imbueElement":
              return <span>Imbued with {trait.elementName}. </span>;
              break;
            case "boostElement":
              return <span>Boosts the power of {trait.elementName} Skills. </span>;
              break;
            case "actionBoost":
              return <span>Boosts the power of {actionDesc}. </span>;
              break;
            case "beatSkill":
              return <span>Randomly casts {trait.skillName} between turns. </span>;
              break;
            case "stackSkill":
              return <span>May cast {trait.skillName} with certain Skills. </span>;
              break;
            case "counterSkill":
              return <span>Counter attacks with {trait.skillName}. </span>;
              break;
            case "statusOnTarget":
              let status = trait.statusName == "Random" ? "random status effects" : trait.statusName
              return <span>May inflict {status} on targets. </span>;
              break;
            case "statusOnPlayer":
              return <span>Randomly gives the player {trait.statusName}. </span>;
              break;
            case "statusReplace":
              return <span>Replaces weapon effect with {trait.statusName}. </span>;
              break;
            case "drain":
              return <span>Drains {trait.statName == "healthPoints" ? "HP" : "MP"} from foes with certain Skills. </span>;
              break;
            case "statDebuff":
              return <span>May slap targets with {trait.statModifierName}. </span>;
              break;
            case "buffReflex":
              return <span>Grants player {trait.statModifierName} when hit with a powerful attack. </span>;
              break;
            default:
              return <span>Um... </span>;
          }
        })}
      </p>
    );
  }
}
EquipTraitsBlurb.propTypes = {
  traits: React.PropTypes.object.isRequired
}

class EquipLevelComparisonComponent extends React.Component {
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
        {renderMap(diffMaps(
          this.props.compareData.elementalResistances,
          this.props.currentData.elementalResistances))}
      </div>

    const statusComparison =
      <div>
        <h4>Status Resistance Changes</h4>
        {renderMap(diffMaps(
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
        {renderMap(totalUpgradeMaterials)}
      </div>;

    return (
      <div className="comparison">
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
class EquipLevelComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // TODO: Add upgrade materials

    let eresContent = null;
    if (this.props.eres) {
      eresContent =
        <div>
          <h4>Elemental Resistances</h4>
          {renderMap(this.props.eres)}
        </div>;
    }

    let sresContent = null;
    if (this.props.sres) {
      sresContent =
        <div>
          <h4>Status Resistances</h4>
          {renderMap(this.props.sres)}
        </div>;
    }

    return (
      <div>
        <div>
          <h4>Stats at Level {this.props.level}</h4>
          {renderEquipStats(this.props.stats)}
        </div>
        {eresContent}
        {sresContent}
      </div>
    );
  }
}
EquipLevelComponent.propTypes = {
  level: React.PropTypes.number.isRequired,
  stats: React.PropTypes.object.isRequired,
  mats: React.PropTypes.object,
  eres: React.PropTypes.object,
  sres: React.PropTypes.object
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


// Resistances
const renderResistances = resistances => (
  null // DONOW
);

const renderMap = theMap => (
  <ul>
    {[...theMap.entries()].map(entry =>
      <li>
        {entry[0]}: {entry[1]}
      </li>
    )}
  </ul>
);

// Upgrade materials
const getPriceForUpgradeMaterials = upgradeMaterials => {
  let cost = 0;
  for (var [name, amount] of upgradeMaterials.entries()) {
    cost += amount * materialCosts.get(name)
  }
  return cost;
}


const sumMaps = mapsArray => {
  let sums = new Map();
  [...mapsArray].forEach(mapToSum => {
    for (var [key, value] of mapToSum.entries()) {
      let originalValue = sums.has(key) ? sums.get(key) : 0;
      sums.set(key, originalValue + value);
    }
  });
  return sums;
}

const diffMaps = function(mapA, mapB) {
  // Ignores elements in B but not in A.
  let diff = new Map();
  mapA.forEach(function(value, key) {
    diff.set(key, mapB.has(key) ? value - mapB.get(key) : value)
  });
  return diff;
}
