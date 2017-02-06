import STATS from '../constants/stats.js';
import getObjectValues from '../utils/getObjectValues.js';
import AttributeCollection from './AttributeCollection.js';

export default class Stats extends AttributeCollection {
  constructor() {
    super(getObjectValues(STATS));
  }
}
