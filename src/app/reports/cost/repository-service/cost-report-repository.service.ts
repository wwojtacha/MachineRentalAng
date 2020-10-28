import {Injectable} from '@angular/core';
import {UrlKeeper} from '../../../utils/url-keeper';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class CostReportRepositoryService {

  url = UrlKeeper;

  constructor(private http: HttpClient) {}

  getEquipmentCostReport(params: HttpParams) {
    return this.http.get(this.url.COST_REPORT, {params});
  }

}
