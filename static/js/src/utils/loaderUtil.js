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

let loadMaterials = () => load('/api/v1/materials/');
let loadEquips = () => load('/api/v1/equips/');

export { loadMaterials, loadEquips };