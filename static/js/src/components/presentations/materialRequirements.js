import React from 'react';

const MaterialRequirements = ({requirements}) => {
  const totalCost = requirements.reduce(
    (total, req) => { return total + req.material.price * req.amount; }, 0);
  return (
    <div className="material-requirements">
      <span className="material-requirements__header">
        Forge Requirements
      </span>
      <table>
        <tbody>
            {requirements.map( (req) =>
            <tr key={req.material.id}>
              <td>
                <img
                  className="item__icon"
                  alt={req.material.name + " item icon"}
                  src={"/images?image=item/" + req.material.name.toLowerCase().replace(' ', '_') + ".png"}/>
              </td>
              <td>
                <span className="material-requirements__material-amount">
                  x {req.amount}
                </span>
              </td>
              <td>
                <span className="material-requirements__material-name">
                  {req.material.name}
                </span>
              </td>
            </tr>)}
        </tbody>
      </table>
      <span className="material-requirements__total-cost">
        Total Gold Cost: {totalCost}
      </span>
    </div>
  );
}
MaterialRequirements.propTypes = {
  requirements: React.PropTypes.array,
};

export default MaterialRequirements;
