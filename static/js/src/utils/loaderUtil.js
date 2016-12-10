const load = url => {
  return fetch(
    new Request(
      url,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  ).then(response => (response.json()));
}

let loadCharacters = () => load('/api/v1/characters/');
let loadEquips = () => load('/api/v1/equips/');
let loadMaterials = () => load('/api/v1/materials/');

export { loadCharacters, loadEquips, loadMaterials };