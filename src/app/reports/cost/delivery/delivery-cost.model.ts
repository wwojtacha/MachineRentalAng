import {Material} from '../../../material/model/material.model';

export class DeliveryCost {

  material: Material;
  priceType: string;
  quantityCount: number;
  costValue: number;


  constructor(material: Material, priceType: string, quantityCount: number, costValue: number) {
    this.material = material;
    this.priceType = priceType;
    this.quantityCount = quantityCount;
    this.costValue = costValue;
  }
}
