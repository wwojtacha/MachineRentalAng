import {Seller} from '../../seller/model/seller.model';
import {Client} from '../../client/model/client.model';
import {Machine} from '../../machine/model/machine.model';

export class Order {
  id: number;
  status: string;
  startDate: Date;
  endDate: Date;
  priceType: string;
  quantity: number;
  price: number;
  value: number;
  dbPrice: boolean;
  seller: Seller;
  client: Client;
  machine: Machine;

  constructor(status: string,
              startDate: Date,
              endDate: Date,
              priceType: string,
              quantity: number,
              price: number,
              seller: Seller,
              client: Client,
              machine: Machine) {
    this.status = status;
    this.startDate = startDate;
    this.endDate = endDate;
    this.priceType = priceType;
    this.quantity = quantity;
    this.price = price;
    this.seller = seller;
    this.client = client;
    this.machine = machine;
  }
}
