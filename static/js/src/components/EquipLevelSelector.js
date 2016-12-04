import React from 'react';

export default class EquipLevelSelector extends React.Component {
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
            <button key={n}
              onClick={() => this.props.setter(n + this.props.min)}>
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
