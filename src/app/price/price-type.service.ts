import {RentalPriceType} from './price-type.enum';

export class PriceTypeService {

  static getAllPriceTypes() {
    let types;

    types = Object.keys(RentalPriceType).filter((type) => isNaN(type as any));

    types.push('Custom');

    return types;
  }

  static getPredefinedPriceTypes() {
    return Object.keys(RentalPriceType)
    .filter((type) => isNaN(type as any));
  }
}
