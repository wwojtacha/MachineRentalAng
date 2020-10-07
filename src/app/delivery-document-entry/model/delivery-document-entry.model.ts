import {Client} from '../../client/model/client.model';
import {Material} from '../../material/model/material.model';
import {EstimatePosition} from '../../estimate/model/estimate.position';
import {CostCode} from '../../costcode/model/costcode.model';
import {DeliveryPrice} from '../../price/delivery/model/delivery-price.model';
import {DeliveryDocument} from '../../delivery-document/model/delivery-document.model';

export class DeliveryDocumentEntry {

  public id: number;
  public contractor: Client;
  public material: Material;
  public quantity: number;
  public measureUnit: string;
  public estimatePosition: EstimatePosition;
  public costCode: CostCode;
  public deliveryPrice: DeliveryPrice;
  public costValue: number;
  public invoiceNumber: string;
  public deliveryDocument: DeliveryDocument;


  constructor(contractor: Client, material: Material, quantity: number, measureUnit: string, estimatePosition: EstimatePosition, costCode: CostCode, deliveryPrice: DeliveryPrice, costValue: number, invoiceNumber: string, deliveryDocument: DeliveryDocument) {
    this.contractor = contractor;
    this.material = material;
    this.quantity = quantity;
    this.measureUnit = measureUnit;
    this.estimatePosition = estimatePosition;
    this.costCode = costCode;
    this.deliveryPrice = deliveryPrice;
    this.costValue = costValue;
    this.invoiceNumber = invoiceNumber;
    this.deliveryDocument = deliveryDocument;
  }
}
