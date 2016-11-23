

var request = new Request(
  '/api/v1/equips/',
  {
    method: 'GET',
    headers: {
     'Content-Type': 'application/json'
    }
  }
);
fetch(request).then(function(response) {
  response.json().then(function(json) {
    ReactDOM.render(
      <EquipSummariesContainer equips={json} />,
      document.getElementById('summaries')
    );
    ReactDOM.render(
      <p>Click an Equip to view its details</p>,
      document.getElementById('details')
    );
  });
});


// Equips Summary:
// A list of each Equip. When clicked, its details are displayed.
const EquipSummariesContainer = props => (
  <ul>{renderEquipSummaries(props.equips)}</ul>
);

const renderEquipSummaries = equips => (
    equips.map(equip => <EquipSummary equip={equip} />)
);

class EquipSummary extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <li onClick={this.handleClick.bind(this)}>
        {this.props.equip.equipName} ({this.props.equip.equipSlot})
      </li>
    );
  }

  handleClick () {
    ReactDOM.render(
      <EquipDetails equip={this.props.equip}/>,
      document.getElementById('details')
    );
  }
}


// Equip Details:
// Show the stats and upgrade materials required at the current level.
// Include an indicator of the current level and buttons to change it.
class EquipDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewingLevel: 1
    }
  }

  render() {
    let equipLevel = this.props.equip.levels[this.state.viewingLevel-1];
    return (
      <div>
        <h3>Details for {this.props.equip.equipName}</h3>
        {renderViewingLevelSelector(this)}
        {renderStatsForEquipLevel(equipLevel)}
        {renderUpgradeMaterialsForEquipLevel(equipLevel)}
      </div>
    );
  }

  setViewingLevel(viewingLevel) {
    this.setState({viewingLevel: viewingLevel})
  }
}

// Level indicator / selector
const renderViewingLevelSelector = equip => (
  <div>
    {renderViewingLevelButtons(equip)}
    <p>Viewing data for level: {equip.state.viewingLevel}</p>
  </div>

);

const renderViewingLevelButtons = equip => (
  <div>
    {[...Array(5).keys()].map(n => renderViewingLevelButton(equip, ++n))}
  </div>
);

const renderViewingLevelButton = function(parent, level) {
  return <button onClick={parent.setViewingLevel.bind(parent, level)}>{level}</button>
}

// Stats
const renderStatsForEquipLevel = equipLevel => (
  <div>
    <h4>Stats</h4>
    <ul>
      <li>Physical Attack: {equipLevel.stats.physicalAttack}</li>
      <li>Magic Attack: {equipLevel.stats.magicAttack}</li>
      <li>Physical Defense: {equipLevel.stats.physicalDefense}</li>
      <li>Magic Defense: {equipLevel.stats.magicDefense}</li>
    </ul>
  </div>
);

// Upgrade materials
const renderUpgradeMaterialsForEquipLevel = function(equipLevel) {
  // Return a list of upgrade materials, but max levels lack that property.
  if (equipLevel.hasOwnProperty("upgradeMaterials")) {
    return (
      <div>
        <h4>Upgrade Materials</h4>
        <ul>
          {equipLevel.upgradeMaterials.map(um => renderUpgradeMaterial(um))}
        </ul>
      </div>
    );
  }
  else {
    return <p>Cannae be impryuved!</p> 
  }  
};

const renderUpgradeMaterial = upgradeMaterial => (
  <li>
    {upgradeMaterial.materialName}: {upgradeMaterial.materialAmount}
  </li>
);
