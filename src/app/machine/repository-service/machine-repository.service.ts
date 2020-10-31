import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Machine} from '../model/machine.model';
import {throwError} from 'rxjs';
import {UrlKeeper} from '../../utils/url-keeper';

@Injectable()
export class MachineRepositoryService {

  private url = UrlKeeper;

  constructor(private http: HttpClient) {
  }

  createMachine(machine: Machine) {
    return this.http.post(this.url.MACHINES, machine);
    // .pipe(catchError(this.handleError));
  }

  updateMachine(id: number, machine: Machine) {
    return this.http.put(this.url.MACHINES + id, machine);
  }

  getMachines(params: HttpParams) {
    return this.http.get(this.url.MACHINES, {params});
  }

  // logs userMessage in console
  private handleError(error: HttpErrorResponse) {
    return throwError(Object.values(error.error)[0]);
  }

  deleteMachine(id: any) {
    return this.http.delete(this.url.MACHINES + id);
  }
}
