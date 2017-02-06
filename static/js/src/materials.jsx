import React from 'react';
import ReactDOM from 'react-dom';
import { loadMaterials } from './utils/loaderUtil'

loadMaterials().then(materials => {
  ReactDOM.render(
    <MaterialsContainer materials={materials} />,
    document.getElementById('content')
  );
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
