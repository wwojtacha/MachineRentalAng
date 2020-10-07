import {HourPrice} from './hour-price.model';

export class DoubleHourPrice {

  editedHourPrice: HourPrice;
  newHourPrice: HourPrice;


  constructor(editedHourPrice: HourPrice, newHourPrice: HourPrice) {
    this.editedHourPrice = editedHourPrice;
    this.newHourPrice = newHourPrice;
  }
}
