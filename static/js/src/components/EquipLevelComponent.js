import React from 'react';
import { renderEquipStats, renderMapAsUnorderedList } from 'utils/equipUtils';

export default class EquipLevelComponent extends React.Component {
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
          {renderMapAsUnorderedList(this.props.eres)}
        </div>;
    }

    let sresContent = null;
    if (this.props.sres) {
      sresContent =
        <div>
          <h4>Status Resistances</h4>
          {renderMapAsUnorderedList(this.props.sres)}
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
