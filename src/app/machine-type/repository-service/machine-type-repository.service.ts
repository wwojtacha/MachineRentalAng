import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MachineType} from '../model/machine-type.model';
import {UrlKeeper} from '../../utils/url-keeper';
import {map} from 'rxjs/operators';

@Injectable()
export class MachineTypeRepositoryService {

  private url = UrlKeeper;

  constructor(private http: HttpClient) {
  }

  createMachineType(machineType: MachineType) {
    return this.http.post(this.url.MACHINE_TYPES, machineType);
  }

  getMachineTypes() {
    return this.http.get(this.url.MACHINE_TYPES);
  }

  update(id: number, machineType: MachineType) {
    return this.http.put(this.url.MACHINE_TYPES + id, machineType);
  }
}
