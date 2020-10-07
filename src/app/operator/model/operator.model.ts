import {Client} from '../../client/model/client.model';

export class Operator {

  id: number;
  name: string;
  qualifications: string;
  company: Client;


  constructor(name: string, qualifications: string, company: Client) {
    this.name = name;
    this.qualifications = qualifications;
    this.company = company;
  }
}
