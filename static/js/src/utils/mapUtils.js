const sumMaps = mapsArray => {
  let sums = new Map();
  [...mapsArray].forEach(mapToSum => {
    for (var [key, value] of mapToSum.entries()) {
      let originalValue = sums.has(key) ? sums.get(key) : 0;
      sums.set(key, originalValue + value);
    }
  });
  return sums;
}

const diffMaps = function(mapA, mapB) {
  // Ignores elements in B but not in A.
  let diff = new Map();
  mapA.forEach(function(value, key) {
    diff.set(key, mapB.has(key) ? value - mapB.get(key) : value)
  });
  return diff;
}

export { sumMaps, diffMaps }