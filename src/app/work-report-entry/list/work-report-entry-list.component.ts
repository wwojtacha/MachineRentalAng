import {Component, OnInit} from '@angular/core';
import {WorkReportEntry} from '../model/work-report-entry.model';
import {WorkReportEntryService} from '../service/work-report-entry.service';
import {Router} from '@angular/router';
import {HttpParams} from '@angular/common/http';
import {WorkReportEntryRepositoryService} from '../repository-service/work-report-entry-repository.service';
import {ErrorDialogComponent} from '../../error-dialog/error-dialog.component';
import {MatDialog} from '@angular/material';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-work-report-entry-list',
  templateUrl: './work-report-entry-list.component.html',
  styleUrls: ['./work-report-entry-list.component.css']
})
export class WorkReportEntryListComponent implements OnInit {

  workReportEntries = new BehaviorSubject<WorkReportEntry[]>([]);

  constructor(private workReportEntryService: WorkReportEntryService,
              private workReportEntryRepositoryService: WorkReportEntryRepositoryService,
              private router: Router,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {

    if (history.state.shouldGetDataFromDb) {

      const workDocument = history.state.workDocument;

      const params = new HttpParams({
        fromObject: {
          workDocumentId: workDocument.id
        }
      });

      this.workReportEntryService.clearWorkReportEntries();

      this.workReportEntryRepositoryService.getWorkReportEntries(params).subscribe((response: WorkReportEntry[]) => {
        this.workReportEntryService.addWorkReportEntries(response);
        this.workReportEntries.next(this.workReportEntryService.getWorkReportEntries());
      });

      // this.fetchWorkReportEntries();

    } else if (history.state.isDocumentEntryOnEdit === undefined) {
      this.workReportEntryService.clearWorkReportEntries();
    }

    this.workReportEntries.next(this.workReportEntryService.getWorkReportEntries());
  }

  // fetchWorkReportEntries() {
  //   const workDocument = history.state.workDocument;
  //
  //   const params = new HttpParams({
  //     fromObject: {
  //       workDocumentId: workDocument.id
  //     }
  //   });
  //   this.workReportEntryRepositoryService.getWorkReportEntries(params).subscribe((entries: WorkReportEntry[]) => {
  //     this.workReportEntries$.next(entries);
  //     }
  //   );
  // }

  onEditWorkDocumentEntry(workReportEntry: WorkReportEntry, index: number) {

    let workDocument;
    if (history.state.isDocumentEntryOnEdit !== undefined) {
      workDocument = history.state.workReportEntry.workDocument;
    } else {
      workDocument = history.state.workDocument;
    }

    const documentType = workDocument.documentType;

    // let url = 'work-documents';

    const url = 'work-report-entry-add/';


    // if ('WORK_REPORT' === documentType) {
    //   url = 'work-report-entry-add/';
    // } else if ('ROAD_CARD' === documentType) {
    //   url = 'road-card-entry-add/';
    // }

    this.router.navigateByUrl(url, {state: {workReportEntry, workDocument, index}});
  }

  onDeleteWorkDocumentEntry(workReportEntryId: any, index: number) {
    if (workReportEntryId === undefined) {
      this.workReportEntryService.deleteWorkReportEntry(index);
      this.workReportEntries.getValue().splice(index, 1);
    } else {
      this.workReportEntryRepositoryService.deleteWorkReportEntry(workReportEntryId).subscribe(
        data => {
          this.workReportEntryService.deleteWorkReportEntry(index);
          this.workReportEntries.getValue().splice(index, 1);
        },
        err => {
          let userMessage;
          const entries = Object.entries(err.error);
          for (const entry of entries) {
            if (entry[0] === 'message') {
              userMessage = entry[1];
            }
          }

          this.dialog.open(ErrorDialogComponent, {
            width: '450px',
            data: userMessage
          });
        }
      );
    }
  }
}
