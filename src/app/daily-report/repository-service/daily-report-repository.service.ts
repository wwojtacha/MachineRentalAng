import {Injectable} from '@angular/core';
import {UrlKeeper} from '../../utils/url-keeper';
import {HttpClient, HttpParams} from '@angular/common/http';
import {DailyReport} from '../model/daily-report.model';

@Injectable()
export class DailyReportRepositoryService {

  url = UrlKeeper;

  constructor(private http: HttpClient) {}

  createDailyReport(dailyReport: DailyReport) {
    return this.http.post(this.url.DAILY_REPORTS, dailyReport);
  }

  getDailyReports(params: HttpParams) {
    return this.http.get(this.url.DAILY_REPORTS, {params});
  }

  getDailyReport(documentNumber: string) {
    return this.http.get(this.url.DAILY_REPORTS + documentNumber);
  }

  updateDailyReport(id: string, dailyReport: DailyReport) {
    return this.http.put(this.url.DAILY_REPORTS + id, dailyReport);
  }

  deleteDailyReport(id: number) {
    return this.http.delete(this.url.DAILY_REPORTS + id);
  }

}
