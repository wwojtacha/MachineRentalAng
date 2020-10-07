import {Operator} from '../../operator/model/operator.model';
import {Machine} from '../../machine/model/machine.model';

export class WorkDocument {

  id: string;
  documentType: string;
  date: Date;
  operator: Operator;
  machine: Machine;
  counterStart: number;
  counterEnd: number;
  delegation: string;
  invoiceNumber: string;


  constructor(id: string, documentType: string, date: Date, operator: Operator, machine: Machine, counterStart: number, counterEnd: number, delegation: string, invoiceNumber: string) {
    this.id = id;
    this.documentType = documentType;
    this.date = date;
    this.operator = operator;
    this.machine = machine;
    this.counterStart = counterStart;
    this.counterEnd = counterEnd;
    this.delegation = delegation;
    this.invoiceNumber = invoiceNumber;
  }
}
