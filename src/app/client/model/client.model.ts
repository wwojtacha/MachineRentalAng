export class Client {
  public id: number;
  public mpk: string;
  public name: string;
  public city: string;
  public street: string;
  public buildingNumber: string;
  public postalCode: string;
  public email: string;
  public contactPerson: string;
  public phoneNumber: string;


  constructor(mpk: string, name: string, city: string, street: string, buildingNumber: string, postalCode: string, email: string, contactPerson: string, phoneNumber: string) {
    this.mpk = mpk;
    this.name = name;
    this.city = city;
    this.street = street;
    this.buildingNumber = buildingNumber;
    this.postalCode = postalCode;
    this.email = email;
    this.contactPerson = contactPerson;
    this.phoneNumber = phoneNumber;
  }
}
