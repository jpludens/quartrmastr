export default class AttributeCollection { // Should extend Map
  // See http://stackoverflow.com/questions/28900954/why-isnt-map-subclassable-in-chrome-node
  // Map can't be extended because reasons, so instead this provides a limited wrapper with utility functions.
  constructor(keys) {
    this._map = new Map();
    keys.forEach(key => {
      this.set(key, 0);
    });
  }

  has(key) {
    return this._map.has(key);
  }

  get(key) {
    return this._map.get(key);
  }

  set(key, value) {
    return this._map.set(key, value);
  }

  delete(key) {
    return this._map.delete(key);
  }

  keys() {
    return this._map.keys();
  }

  values() {
    return this._map.values();
  }

  entries() {
    return this._map.entries();
  }

  _new() {
    return new this.constructor(this.keys());
  }

  add(other) {
    const result = this._new(this.keys());
    for (let [key, value] of this.entries()) {
      result.set(key, value + other.get(key))
    };
    return result;
  }

  subtract(other) {
    const result = this._new();
    for (let [key, value] of this.entries()) {
      result.set(key, value - other.get(key))
    };
    return result;
  }

  getNonZeroOnly() {
    const result = this._new(this.keys());
    for (let [key, value] of this.entries()) {
      if (value) {
        result.set(key, value);
      }
      else {
        result.delete(key)
      }
    }
    return result;
  }

  fromObj(obj) {
    const collection = new this.constructor();
    [...this.keys()].forEach(key => {
      collection.set(key, obj[key])
    });
    return collection
  }
}
