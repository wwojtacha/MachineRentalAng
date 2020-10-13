import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {UrlKeeper} from '../utils/url-keeper';

@Injectable()
export class ReportService {

  private url = UrlKeeper;

  constructor(private http: HttpClient) {
  }

  generateExcelWorkReportEntryReport(params: HttpParams) {
    return this.http.get(this.url.WORK_REPORT_ENTRY_REPORT, {responseType: 'blob', params});
  }

  generateExcelRoadCardEntryReport(params: HttpParams) {
    return this.http.get(this.url.ROAD_CARD_ENTRY_REPORT, {responseType: 'blob', params});
  }

  generateExcelDeliveryDocumentEntryReport(params: HttpParams) {
    return this.http.get(this.url.DELIVERY_DOCUMENT_ENTRY_REPORT, {responseType: 'blob', params});
  }
}
