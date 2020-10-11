import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {UrlKeeper} from '../utils/url-keeper';

@Injectable()
export class WorkReportReportService {

  private url = UrlKeeper;

  constructor(private http: HttpClient) {
  }

  generateReport(params: HttpParams) {
    return this.http.get(this.url.REPORTS, {params});
  }

  generateExcelReport(response: any, params: HttpParams) {
    return this.http.get(this.url.REPORTS, {params});
  }
}
