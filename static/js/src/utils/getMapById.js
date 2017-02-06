// TODO move this into mapUtils

export default function getMapById(objects) {
  const objectsMap = new Map();
  objects.forEach(object => {
    objectsMap.set(object.id, object);
  })
  return objectsMap;
}
