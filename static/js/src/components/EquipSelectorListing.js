import React from 'react';
import ReactDOM from 'react-dom';
import EquipDetailsComponent from 'components/EquipDetailsComponent';

export default class EquipSelectorListing extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <span
        onClick={this.handleClick.bind(this)}>
        {this.props.equip.name} ({this.props.equip.slot})
      </span>
    );
  }

  handleClick () {
    ReactDOM.render(
      <EquipDetailsComponent equip={this.props.equip}/>,
      document.getElementById('equip-details')
    );
  }
}
EquipSelectorListing.propTypes = {
  equip: React.PropTypes.object.isRequired
}
