export class DeliveryDocument {

  public id: number;
  public documentNumber: string;
  public date: Date;

  constructor(documentNumber: string, date: Date) {
    this.documentNumber = documentNumber;
    this.date = date;
  }
}
