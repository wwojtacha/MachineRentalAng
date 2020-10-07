import {Material} from '../../../material/model/material.model';
import {Client} from '../../../client/model/client.model';

export class DeliveryPrice {

  public id: number;
  public contractor: Client;
  public material: Material;
  public priceType: string;
  public price: number;
  public startDate: Date;
  public endDate: Date;
  public projectCode: string;


  constructor(contractor: Client, material: Material, priceType: string, price: number, startDate: Date, endDate: Date, projectCode: string) {
    this.contractor = contractor;
    this.material = material;
    this.priceType = priceType;
    this.price = price;
    this.startDate = startDate;
    this.endDate = endDate;
    this.projectCode = projectCode;
  }
}
