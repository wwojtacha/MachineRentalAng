import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {HttpParams} from '@angular/common/http';
import {ErrorDialogComponent} from '../../error-dialog/error-dialog.component';
import {RoadCardEntry} from '../model/road-card-entry.model';
import {RoadCardEntryService} from '../service/road-card-entry.service';
import {RoadCardEntryRepositoryService} from '../repository-service/road-card-entry-repository.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-road-card-entry-list',
  templateUrl: './road-card-entry-list.component.html',
  styleUrls: ['./road-card-entry-list.component.css']
})
export class RoadCardEntryListComponent implements  OnInit {

  roadCardEntries = new BehaviorSubject<RoadCardEntry[]>([])

  constructor(private roadCardEntryService: RoadCardEntryService,
              private roadCardEntryRepositoryService: RoadCardEntryRepositoryService,
              private router: Router,
              public dialog: MatDialog) {}

  ngOnInit(): void {
    // this.workReportEntries = this.workReportEntryService.getWorkReportEntries();

    if (history.state.shouldGetDataFromDb) {

      const workDocument = history.state.workDocument;

      const params = new HttpParams({fromObject: {
          workDocumentId: workDocument.id
        }});

      this.roadCardEntryService.clearRoadCardEntries();

      this.roadCardEntryRepositoryService.getRoadCardEntries(params).subscribe((response: RoadCardEntry[]) => {
        this.roadCardEntryService.addRoadCardEntries(response);
        this.roadCardEntries.next(this.roadCardEntryService.getRoadCardEntries());
      });

    } else if (history.state.isDocumentEntryOnEdit === undefined) {
      this.roadCardEntryService.clearRoadCardEntries();
    }

    this.roadCardEntries.next(this.roadCardEntryService.getRoadCardEntries());
  }

  onEditWorkDocumentEntry(roadCardEntry: RoadCardEntry, index: number) {

    let workDocument;
    if (history.state.isDocumentEntryOnEdit) {
      workDocument = history.state.roadCardEntry.workDocument;
    } else {
      workDocument = history.state.workDocument;
    }

    const documentType = workDocument.documentType;

    // let url = 'work-documents';

    const url = 'road-card-entry-add/';


    // if ('WORK_REPORT' === documentType) {
    //   url = 'work-report-entry-add/';
    // } else if ('ROAD_CARD' === documentType) {
    //   url = 'road-card-entry-add/';
    // }

    this.router.navigateByUrl(url, {state: {roadCardEntry, workDocument, index}});
  }

  onDeleteWorkDocumentEntry(roadCardEntryId: any, index: number) {
    if (roadCardEntryId === undefined) {
      this.roadCardEntryService.deleteRoadCardEntry(index);
      this.roadCardEntries.getValue().splice(index, 1);
    } else {
      this.roadCardEntryRepositoryService.deleteRoadCardEntry(roadCardEntryId).subscribe(
        data => {
          this.roadCardEntryService.deleteRoadCardEntry(index);
          this.roadCardEntries.getValue().splice(index, 1);
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
