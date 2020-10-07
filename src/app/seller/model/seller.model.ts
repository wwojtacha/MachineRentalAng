export class Seller {

  id: number;
  mpk: string;
  name: string;
  city: string;
  street: string;
  buildingNumber: string;
  postalCode: string;

  constructor(mpk: string, name: string, city: string, street: string, buildingNumber: string, postalCode: string) {
    this.mpk = mpk;
    this.name = name;
    this.city = city;
    this.street = street;
    this.buildingNumber = buildingNumber;
    this.postalCode = postalCode;
  }
}
