import { AILMENTS } from '../constants/statuses.js';
import getObjectValues from '../utils/getObjectValues.js';
import AttributeCollection from './AttributeCollection.js';

export default class StatusResistances extends AttributeCollection {
  constructor() {
    super(getObjectValues(AILMENTS));
  }
}
