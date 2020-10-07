import {Injectable} from '@angular/core';
import {UrlKeeper} from '../../utils/url-keeper';
import {HttpClient, HttpParams} from '@angular/common/http';
import {WorkReportEntry} from '../model/work-report-entry.model';

@Injectable()
export class WorkReportEntryRepositoryService {
  url = UrlKeeper;

  constructor(private http: HttpClient) {}

  createWorkReportEntry(workReportEntries: WorkReportEntry[]) {
    return this.http.post(this.url.WORK_REPORT_ENTRIES, workReportEntries);
  }

  getWorkReportEntries(params: HttpParams) {
    return this.http.get(this.url.WORK_REPORT_ENTRIES, {params});
  }

  deleteWorkReportEntry(id: number) {
    return this.http.delete(this.url.WORK_REPORT_ENTRIES + id);
  }
}
