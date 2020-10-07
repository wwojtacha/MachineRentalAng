import {DistancePrice} from './distance-price.model';

export class DoubleDistancePrice {

  editedDistancePrice: DistancePrice;
  newDistancePrice: DistancePrice;


  constructor(editedDistancePrice: DistancePrice, newDistancePrice: DistancePrice) {
    this.editedDistancePrice = editedDistancePrice;
    this.newDistancePrice = newDistancePrice;
  }
}
