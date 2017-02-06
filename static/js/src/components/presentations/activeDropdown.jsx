import React from 'react';

const ActiveDropdown = ({ options, defaultValue, onChange }) => (
    <select className="active-dropdown"
      onChange={onChange} defaultValue={defaultValue}>
      {[...options.entries()].map(entry =>
        <option key={entry[0]} value={entry[0]}>
        	{entry[1]}
        </option>
      )}
    </select>
  );

ActiveDropdown.propTypes = {
  options: React.PropTypes.instanceOf(Map).isRequired,
  defaultValue: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

export default ActiveDropdown;
