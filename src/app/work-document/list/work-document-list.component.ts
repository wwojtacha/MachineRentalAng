import {Component, OnInit} from '@angular/core';
import {MessageStyler} from '../../utils/message-styler';
import {Operator} from '../../operator/model/operator.model';
import {Machine} from '../../machine/model/machine.model';
import {FormControl, FormGroup} from '@angular/forms';
import {WorkDocument} from '../model/work-document.model';
import {Router} from '@angular/router';
import {OperatorRepositoryService} from '../../operator/repository-service/operator-repository.service';
import {MachineRepositoryService} from '../../machine/repository-service/machine-repository.service';
import {HttpParams} from '@angular/common/http';
import {WorkDocumentRepositoryService} from '../repository-service/work-document-repository.service';
import {ConfirmationDialogComponent} from '../../confirmation-dialog/confirmation-dialog.component';
import {ErrorDialogComponent} from '../../error-dialog/error-dialog.component';
import {MatDialog} from '@angular/material';
import {BehaviorSubject} from 'rxjs';
import {WorkDocumentService} from '../service/work-document.service';

@Component({
  selector: 'app-work-document-list',
  templateUrl: './work-document-list.component.html',
  styleUrls: ['./work-document-list.component.css']
})
export class WorkDocumentListComponent implements OnInit {
  operators: Operator[] = [];
  machines: Machine[] = [];
  workDocumentListForm: FormGroup;
  workDocuments = new BehaviorSubject<WorkDocument[]>([]);
  messageStyler = MessageStyler;

  constructor(private router: Router,
              private operatorRepositoryService: OperatorRepositoryService,
              private machineRepositoryService: MachineRepositoryService,
              private workDocumentRepositoryService: WorkDocumentRepositoryService,
              private workDocumentService: WorkDocumentService,
              public dialog: MatDialog) {}

  ngOnInit(): void {

    this.workDocumentListForm = new FormGroup({
      documentId: new FormControl(''),
      documentType: new FormControl(''),
      date: new FormControl(''),
      operator: new FormControl(''),
      machine: new FormControl(''),
      counterStart: new FormControl(''),
      counterEnd: new FormControl(''),
      delegation: new FormControl(''),
      invoiceNumber: new FormControl('')
    });

    const params = new HttpParams({});

    this.operatorRepositoryService.getOperators(params).subscribe(response => this.operators = Object.values(response)[0]);

    this.machineRepositoryService.getMachines(params).subscribe(response => this.machines = Object.values(response)[0]);

    this.workDocuments.next(this.workDocumentService.getWorkDocuments());

    document.getElementById('newWorkDocumentButton').focus();
  }

  onSearch() {

    const params = new HttpParams({
      fromObject: {
        id: this.workDocumentListForm.value.documentId,
        documentType: this.workDocumentListForm.value.documentType,
        date: this.workDocumentListForm.value.date,
        operatorName: this.workDocumentListForm.value.operator,
        machineInternalId: this.workDocumentListForm.value.machine,
        counterStart: this.workDocumentListForm.value.counterStart,
        counterEnd: this.workDocumentListForm.value.counterEnd,
        delegation: this.workDocumentListForm.value.delegation,
        invoiceNumber: this.workDocumentListForm.value.invoiceNumber
      }
    });

    this.workDocumentRepositoryService.getWorkDocuments(params).subscribe(response => {
      this.workDocuments.next(Object.values(response)[0]);
      this.workDocumentService.clearWorkDocuments();
      this.workDocumentService.addWorkDocuments(Object.values(response)[0]);
    });
  }

  onEditWorkDocument(workDocument: WorkDocument) {
    const isOnEdit = true;
    const isSaveEntriesButtonVisible = false;
    const isAddNewWorkDocumentEntryButtonVisible = false;

    this.router.navigateByUrl('work-document-add/', {state: {workDocument, isOnEdit, isSaveEntriesButtonVisible, isAddNewWorkDocumentEntryButtonVisible}});
  }

  onDeleteWorkDocument(id: string, index: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Are you sure you want to delete ?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.workDocumentRepositoryService.deleteWorkDocument(id).subscribe(
          data => {
            this.workDocuments.getValue().splice(index, 1);
          },
          err => {
            let userMessage;
            const entries = Object.entries(err.error);
            for (const entry of entries) {
              if (entry[0] === 'message') {
                userMessage = entry[1];
              }
            }

            // this.userMessage = Object.keys(err.error).find(k => err.error[k].index === 'message');

            this.dialog.open(ErrorDialogComponent, {
              width: '450px',
              data: userMessage
            });
          }
        );
      }
    });
  }

  onShowEntries(workDocument: WorkDocument) {

    const url = 'work-document-add';

    const shouldGetDataFromDb = true;

    const isSaveEntriesButtonVisible = false;
    const isAddNewWorkDocumentEntryButtonVisible = true;
    const areEntriesVisible = true;

    this.router.navigateByUrl(url, {state: {
      workDocument, shouldGetDataFromDb, isAddNewWorkDocumentEntryButtonVisible, isSaveEntriesButtonVisible, areEntriesVisible}});
  }

  onAddNewWorkDocument() {
    const url = 'work-document-add';
    const isOnAddNewWorkDocument = true;

    const isSaveEntriesButtonVisible = false;
    const isAddNewWorkDocumentEntryButtonVisible = false;
    this.router.navigateByUrl(url, {state: {isOnAddNewWorkDocument, isAddNewWorkDocumentEntryButtonVisible, isSaveEntriesButtonVisible}});
  }
}
