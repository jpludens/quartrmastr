import React from 'react';

const ActiveList = ({ items, onClick }) => {
  return (
    <ul className="active-list">
      {items.map(item => {
        return (
            <li key={item.id} onClick={() => onClick(item.id)}>
              {item.text}
            </li>      
          );
      })}
    </ul>
  );
};

ActiveList.propTypes = {
  items: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.number,
      text: React.PropTypes.string,
    })
  ).isRequired,
  onClick: React.PropTypes.func.isRequired,
};

export default ActiveList;
