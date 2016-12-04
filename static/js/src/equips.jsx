import React from 'react';
import ReactDOM from 'react-dom';
import Equip from 'classes/Equip';
import EquipSelector from 'components/EquipSelector';
import { loadEquips } from 'utils/loaderUtil';

loadEquips().then(equipsData => {
  let equips = equipsData.map(e => new Equip(e));
  ReactDOM.render(
    <EquipSelector equips={equips} />,
    document.getElementById('equip-selector')
  );
  
  ReactDOM.render(
    <p>Click an Equip to view its details</p>,
    document.getElementById('equip-details')
  );
});
