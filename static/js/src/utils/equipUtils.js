import React from 'react';
import { loadMaterials } from 'utils/loaderUtil';

var materialCosts = new Map();
loadMaterials().then(materials => {
  [...materials].forEach(material => {
    materialCosts.set(material.name, material.gold);
  });
});

const getPriceForUpgradeMaterials = upgradeMaterials => {
  let cost = 0;
  for (var [name, amount] of upgradeMaterials.entries()) {
    cost += amount * materialCosts.get(name)
  }
  return cost;
};


const diffStats = function (statsA, statsB) {
  let diff = {}
  for (let stat in statsA) {
    if (statsA.hasOwnProperty(stat)) {
      diff[stat] = statsA[stat] - statsB[stat];
    }
  }
  return diff;
};

const renderMapAsUnorderedList = theMap => (
  <ul>
    {[...theMap.entries()].map((entry, index) =>
      <li key={index}>
        {entry[0]}: {entry[1]}
      </li>
    )}
  </ul>
);

const renderEquipStats = stats => (
  <ul>
    <li>Health Points: {stats.healthPoints}</li>
    <li>Magic Points: {stats.magicPoints}</li>
    <li>Physical Attack: {stats.physicalAttack}</li>
    <li>Magic Attack: {stats.magicAttack}</li>
    <li>Physical Defence: {stats.physicalDefence}</li>
    <li>Magic Defence: {stats.magicDefence}</li>
    <li>Accuracy: {stats.accuracy}</li>
    <li>Evade: {stats.evade}</li>
  </ul>
);

export { diffStats, getPriceForUpgradeMaterials, renderMapAsUnorderedList, renderEquipStats };
