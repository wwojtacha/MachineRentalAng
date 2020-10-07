import {Client} from '../../client/model/client.model';

export class DeliveryDocument {

  public id: number;
  public contractor: Client;
  public documentNumber: string;
  public date: Date;

  constructor(contractor: Client, documentNumber: string, date: Date) {
    this.contractor = contractor;
    this.documentNumber = documentNumber;
    this.date = date;
  }
}
