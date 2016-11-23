
var request = new Request(
  '/api/v1/materials/',
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
      <MaterialsContainer materials={json} />,
      document.getElementById('content')
    );
  });
});

const MaterialsContainer = props => (
  <ul>{renderMaterials(props.materials)}</ul>
);

const renderMaterials = materials => (
  materials.map(material => renderMaterial(material))
);

const renderMaterial = material => (
  <li>
    <MaterialCount />
    <p>{material.name} (Price: {material.gold})</p>
    <br />
  </li>
);
renderMaterial.propTypes = {
    name: React.PropTypes.string.isRequired,
    gold: React.PropTypes.number.isRequired
};

class MaterialCount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }

  render() {
    return (
      <input
        type="number"
        value={this.state.count}
        onChange={this.handleChange.bind(this)}/>
    );
  }

  handleChange(e) {
    this.setState({ count: e.target.value })
  }
}
MaterialCount.propTypes = {

};
