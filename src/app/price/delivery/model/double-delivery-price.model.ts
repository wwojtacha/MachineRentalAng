import {DeliveryPrice} from './delivery-price.model';

export class DoubleDeliveryPrice {

  editedDeliveryPrice: DeliveryPrice;
  newDeliveryPrice: DeliveryPrice;


  constructor(editedDeliveryPrice: DeliveryPrice, newDeliveryPrice: DeliveryPrice) {
    this.editedDeliveryPrice = editedDeliveryPrice;
    this.newDeliveryPrice = newDeliveryPrice;
  }
}
