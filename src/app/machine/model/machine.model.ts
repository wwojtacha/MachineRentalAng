import {MachineType} from '../../machine-type/model/machine-type.model';
import {Client} from '../../client/model/client.model';

export class Machine {

  public id: number;
  public internalId: string;
  public name: string;
  public model: string;
  public machineType: MachineType;
  public producer: string;
  public productionYear: number;
  public owner: Client;
  public machineStatus: string;
  public totalPhysicalQuantity: number;

  constructor(internalId?: string, name?: string, model?: string, machineType?: MachineType, producer?: string, productionYear?: number, owner?: Client, machineStatus?: string, quantity?: number) {
    this.internalId = internalId;
    this.name = name;
    this.model = model;
    this.machineType = machineType;
    this.producer = producer;
    this.productionYear = productionYear;
    this.owner = owner;
    this.machineStatus = machineStatus;
    this.totalPhysicalQuantity = quantity;
  }
}
