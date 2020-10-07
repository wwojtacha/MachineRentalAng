import {Injectable} from '@angular/core';
import {WorkReportEntry} from '../model/work-report-entry.model';

@Injectable()
export class WorkReportEntryService {

  private workReportEntries: WorkReportEntry[] = [];

  addWorkReportEntry(workReportEntry: WorkReportEntry) {
    this.workReportEntries.push(workReportEntry);
  }

  getWorkReportEntries() {
    return this.workReportEntries.slice();
  }

  clearWorkReportEntries() {
    this.workReportEntries.length = 0;
  }

  addWorkReportEntries(workReportEntries: WorkReportEntry[]) {
    this.workReportEntries.push.apply(this.workReportEntries, workReportEntries);
  }

  updateWorkReportEntry(index: number, workReportEntry: WorkReportEntry) {
    this.workReportEntries[index] = workReportEntry;
  }

  getWorkReportEntry(index: number) {
    return this.workReportEntries.slice()[index];
  }

  deleteWorkReportEntry(index: number) {
    this.workReportEntries.splice(index, 1);
  }

}
