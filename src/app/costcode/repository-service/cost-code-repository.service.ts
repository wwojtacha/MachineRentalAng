import {Injectable} from '@angular/core';
import {UrlKeeper} from '../../utils/url-keeper';
import {CostCode} from '../model/costcode.model';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class CostCodeRepositoryService {

  private url = UrlKeeper;

  // constructor(private http: HttpClient) {}

  constructor(private http: HttpClient) {
  }

  getCostCodes(params: HttpParams) {
    return this.http.get(this.url.CODES, {params});
  }

  createCostCode(costCode: CostCode) {
    return this.http.post(this.url.CODES, costCode);
  }

  updateCostCode(id: number, costCode: CostCode) {
    return this.http.put(this.url.CODES + id, costCode);
  }
}
