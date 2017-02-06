import ELEMENTS from '../constants/elements.js';
import getObjectValues from '../utils/getObjectValues.js';
import AttributeCollection from './AttributeCollection.js';

export default class ElementalResistances extends AttributeCollection {
  constructor() {
    super(getObjectValues(ELEMENTS));
  }
}
