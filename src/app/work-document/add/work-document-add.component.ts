import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageStyler} from '../../utils/message-styler';
import {ActivatedRoute, Router} from '@angular/router';
import {Operator} from '../../operator/model/operator.model';
import {Machine} from '../../machine/model/machine.model';
import {HttpParams} from '@angular/common/http';
import {OperatorRepositoryService} from '../../operator/repository-service/operator-repository.service';
import {MachineRepositoryService} from '../../machine/repository-service/machine-repository.service';
import {WorkDocument} from '../model/work-document.model';
import {WorkDocumentRepositoryService} from '../repository-service/work-document-repository.service';
import {WorkReportEntry} from '../../work-report-entry/model/work-report-entry.model';
import {WorkReportEntryService} from '../../work-report-entry/service/work-report-entry.service';
import {WorkReportEntryRepositoryService} from '../../work-report-entry/repository-service/work-report-entry-repository.service';
import {RoadCardEntryService} from '../../road-card-entry/service/road-card-entry.service';
import {RoadCardEntryRepositoryService} from '../../road-card-entry/repository-service/road-card-entry-repository.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-work-document-add',
  templateUrl: './work-document-add.component.html',
  styleUrls: ['./work-document-add.component.css']
})
export class WorkDocumentAddComponent implements OnInit {

  workDocumentForm: FormGroup;
  isOnEdit = history.state.isOnEdit;
  operators = new BehaviorSubject<Operator[]>([]);
  isOperatorSelectShown = history.state.isOnAddNewWorkDocument;
  isMachineSelectShownn = history.state.isOnAddNewWorkDocument;
  machines = new BehaviorSubject<Machine[]>([]);
  userMessages: any[] = [];
  messageStyler = MessageStyler;

  constructor(private route: ActivatedRoute,
              private operatorRepositoryService: OperatorRepositoryService,
              private machineRepositoryService: MachineRepositoryService,
              private workDocumentRepositoryService: WorkDocumentRepositoryService,
              private router: Router,
              private workReportEntryService: WorkReportEntryService,
              private workReportEntryRepositoryService: WorkReportEntryRepositoryService,
              private roadCardEntryService: RoadCardEntryService,
              private roadCardEntryRepositoryService: RoadCardEntryRepositoryService) {
  }

  ngOnInit(): void {


    const queryParams = new HttpParams({});

    this.operatorRepositoryService.getOperators(queryParams).subscribe(response => this.operators.next(Object.values(response)[0]));

    this.machineRepositoryService.getMachines(queryParams).subscribe(response => this.machines.next(Object.values(response)[0]));
    //     //
    //     // if (this.isOnEdit) {
    //     //
    //     //   // this.route.firstChild.params
    //     //   // .subscribe((params: Params) => {
    //     //   //   this.id = params.id;
    //     //   // });
    //     //
    //     //   // this.workDocumentRepositoryService.getWorkDocument(this.id).subscribe((response: WorkDocument) => {
    //     //     const workDocument: WorkDocument = history.state.workDocument;
    //     //
    //     //     this.workDocumentForm = new FormGroup({
    //     //       documentId: new FormControl(workDocument.id, Validators.required),
    //     //       documentType: new FormControl(workDocument.documentType, Validators.required),
    //     //       date: new FormControl(workDocument.date, Validators.required),
    //     //       editedOperator: new FormControl({value: workDocument.operator.name, disabled: true}),
    //     //       operator: new FormControl(workDocument.operator, Validators.required),
    //     //       editedMachine: new FormControl({value: workDocument.machine.internalId, disabled: true}),
    //     //       machine: new FormControl(workDocument.machine, Validators.required),
    //     //       counterStart: new FormControl(workDocument.counterStart, Validators.required),
    //     //       counterEnd: new FormControl(workDocument.counterEnd, Validators.required),
    //     //     });
    //     //   // });
    //     //
    //     //     this.workReportEntryService.clearWorkReportEntries();
    //     //
    //     // } else if (history.state.shouldGetDataFromDb) {
    //     //
    //     //   const workDocument = history.state.workDocument;
    //     //
    //     //   this.workDocumentForm = new FormGroup({
    //     //     documentId: new FormControl({value: workDocument.id, disabled: true}),
    //     //     documentType: new FormControl({value: workDocument.documentType, disabled: true}),
    //     //     date: new FormControl({value: workDocument.date, disabled: true}),
    //     //     editedOperator: new FormControl({value: workDocument.operator.name, disabled: true}),
    //     //     operator: new FormControl({value: workDocument.operator, hidden: true}),
    //     //     editedMachine: new FormControl({value: workDocument.machine.internalId, disabled: true}),
    //     //     machine: new FormControl({value: workDocument.machine, hidden: true}),
    //     //     counterStart: new FormControl({value: workDocument.counterStart, disabled: true}),
    //     //     counterEnd: new FormControl({value: workDocument.counterEnd, disabled: true})
    //     //   });
    //     //
    //     //   const params = new HttpParams({fromObject: {
    //     //     workDocumentId: workDocument.id
    //     //     }});
    //     //
    //     //   this.workReportEntryService.clearWorkReportEntries();
    //     //
    //     //   this.workReportEntryRepositoryService.getWorkReportEntries(params).subscribe((response: WorkReportEntry[]) => {
    //     //     this.workReportEntryService.addWorkReportEntries(response);
    //     //     this.workReportEntries = this.workReportEntryService.getWorkReportEntries();
    //     //   });
    //     //
    //     // } else if (history.state.isDocumentEntryOnEdit !== undefined) {
    //     //
    //     //   const workDocument = history.state.workReportEntry.workDocument;
    //     //
    //     //   this.workDocumentForm = new FormGroup({
    //     //     documentId: new FormControl({value: workDocument.id, disabled: true}),
    //     //     documentType: new FormControl({value: workDocument.documentType, disabled: true}),
    //     //     date: new FormControl({value: workDocument.date, disabled: true}),
    //     //     editedOperator: new FormControl({value: workDocument.operator.name, disabled: true}),
    //     //     operator: new FormControl({value: workDocument.operator, hidden: true}),
    //     //     editedMachine: new FormControl({value: workDocument.machine.internalId, disabled: true}),
    //     //     machine: new FormControl({value: workDocument.machine, hidden: true}),
    //     //     counterStart: new FormControl({value: workDocument.counterStart, disabled: true}),
    //     //     counterEnd: new FormControl({value: workDocument.counterEnd, disabled: true})
    //     //   });
    //     //
    //     //   // this.workReportEntryService.clearWorkReportEntries();
    //     // } else if (history.state.isOnAddNewWorkDocument) {
    //     //   this.workReportEntryService.clearWorkReportEntries();
    //     // }
    //     //
    //     // this.workReportEntries = this.workReportEntryService.getWorkReportEntries();

    let workDocument: WorkDocument;

    if (this.isOnEdit || history.state.shouldGetDataFromDb !== undefined) {
      workDocument = history.state.workDocument;
    } else if (history.state.isDocumentEntryOnEdit !== undefined && history.state.workReportEntry) {
      workDocument = history.state.workReportEntry.workDocument;
    } else if (history.state.isDocumentEntryOnEdit !== undefined && history.state.roadCardEntry) {
      workDocument = history.state.roadCardEntry.workDocument;
    }

    if (history.state.isOnAddNewWorkDocument) {
      this.workDocumentForm = new FormGroup({
        documentId: new FormControl('', Validators.required),
        documentType: new FormControl('', Validators.required),
        date: new FormControl('', Validators.required),
        editedOperator: new FormControl({value: null, disabled: true}),
        operator: new FormControl('', Validators.required),
        editedMachine: new FormControl({value: null, disabled: true}),
        machine: new FormControl('', Validators.required),
        counterStart: new FormControl('', [Validators.required, Validators.min(0)]),
        counterEnd: new FormControl('', [Validators.required, Validators.min(0)]),
        delegation: new FormControl('', Validators.required),
        invoiceNumber: new FormControl('NOT DEFINED', Validators.required)
      });
    } else if (this.isOnEdit) {
      this.workDocumentForm = new FormGroup({
        documentId: new FormControl({value: workDocument.id, disabled: false}),
        documentType: new FormControl({value: workDocument.documentType, disabled: false}),
        date: new FormControl({value: workDocument.date, disabled: false}),
        editedOperator: new FormControl({value: workDocument.operator.name, disabled: true}),
        operator: new FormControl(workDocument.operator, Validators.required),
        editedMachine: new FormControl({value: workDocument.machine.internalId, disabled: true}),
        machine: new FormControl(workDocument.machine, Validators.required),
        counterStart: new FormControl(workDocument.counterStart, [Validators.required, Validators.min(0)]),
        counterEnd: new FormControl(workDocument.counterEnd, [Validators.required, Validators.min(0)]),
        delegation: new FormControl(workDocument.delegation, Validators.required),
        invoiceNumber: new FormControl(workDocument.invoiceNumber, Validators.required)
      });
    } else if (workDocument === undefined) {
      this.router.navigateByUrl('work-documents');
    } else {
      this.workDocumentForm = new FormGroup({
        documentId: new FormControl({value: workDocument.id, disabled: true}),
        documentType: new FormControl({value: workDocument.documentType, disabled: true}),
        date: new FormControl({value: workDocument.date, disabled: true}),
        editedOperator: new FormControl({value: workDocument.operator.name, disabled: true}),
        operator: new FormControl(workDocument.operator, Validators.required),
        editedMachine: new FormControl({value: workDocument.machine.internalId, disabled: true}),
        machine: new FormControl(workDocument.machine, Validators.required),
        counterStart: new FormControl({value: workDocument.counterStart, disabled: true}),
        counterEnd: new FormControl({value: workDocument.counterEnd, disabled: true}),
        delegation: new FormControl({value: workDocument.delegation, disabled: true}),
        invoiceNumber: new FormControl({value: workDocument.invoiceNumber, disabled: true})
      });
    }

  }

  onSubmit() {

    const newWorkDocument = new WorkDocument(
      this.workDocumentForm.value.documentId,
      this.workDocumentForm.value.documentType,
      this.workDocumentForm.value.date,
      this.workDocumentForm.value.operator,
      this.workDocumentForm.value.machine,
      this.workDocumentForm.value.counterStart,
      this.workDocumentForm.value.counterEnd,
      this.workDocumentForm.value.delegation,
      this.workDocumentForm.value.invoiceNumber
    );

    if (this.isOnEdit) {
      const id = history.state.workDocument.id;
      this.workDocumentRepositoryService.updateWorkDocument(id, newWorkDocument).subscribe(
        data => {
          this.userMessages.length = 0;
          this.userMessages.push('Work document { ' + Object.values(data).splice(0, 3).toString() + ' } has been updated.');
        },
        err => {
          this.userMessages.length = 0;
          const errors = Object.values(err.error);
          for (const error of errors) {
            this.userMessages.push(error);
          }
        }
      );
    } else {
      this.workDocumentRepositoryService.createWorkDocument(newWorkDocument).subscribe(
        data => {
          this.userMessages.length = 0;
          this.userMessages.push('Work document { ' + Object.values(data).splice(0, 3).toString() + ' } has been created.');
          // this.workDocumentForm.reset();
          history.state.isOnAddNewWorkDocument = false;
          history.state.workDocument = newWorkDocument;
          history.state.isAddNewWorkDocumentEntryButtonVisible = true;
          history.state.areEntriesVisible = true;
        },
        err => {
          this.userMessages.length = 0;
          const errors = Object.values(err.error);
          for (const error of errors) {
            this.userMessages.push(error);
          }
        }
      );
    }
  }

  enableOperatorSelect() {
    this.isOperatorSelectShown = true;
  }

  onSelectOperator(operator: any) {

    if (this.isOnEdit) {
      this.workDocumentForm.patchValue({
        editedOperator: operator.name
      });

      this.isOperatorSelectShown = false;
    }
  }

  styleElementToChange() {
    if (this.isOnEdit) {
      return {'background-color': 'blue', color: 'white'};
    }
  }

  enableMachineSelect() {
    this.isMachineSelectShownn = true;
  }

  onSelectMachine(machine: any) {

    if (this.isOnEdit) {
      this.workDocumentForm.patchValue({
        editedMachine: machine.internalId
      });

      this.isMachineSelectShownn = false;
    }
  }

  onAddWorkDocumentEntry() {

    let workDocument;
    if (history.state.isDocumentEntryOnEdit !== undefined && history.state.workReportEntry) {
      workDocument = history.state.workReportEntry.workDocument;
    } else if (history.state.isDocumentEntryOnEdit !== undefined && history.state.roadCardEntry) {
      workDocument = history.state.roadCardEntry.workDocument;
    } else {
      workDocument = history.state.workDocument;
    }

    const documentType = workDocument.documentType;

    let url = 'work-documents';

    if ('WORK_REPORT' === documentType) {
      url = 'work-report-entry-add/';
    } else if ('ROAD_CARD' === documentType) {
      url = 'road-card-entry-add/';
    }

    this.router.navigateByUrl(url, {state: {workDocument}});

  }

  addToWorkReportEntries() {
    const workReportEntry: WorkReportEntry = history.state;
    this.workReportEntryService.addWorkReportEntry(workReportEntry);
  }

  onEditWorkDocumentEntry(workReportEntry: WorkReportEntry, index: number) {

    let workDocument;
    if (history.state.isDocumentEntryOnEdit !== undefined) {
      workDocument = history.state.workReportEntry.workDocument;
    } else {
      workDocument = history.state.workDocument;
    }

    const documentType = workDocument.documentType;

    let url = 'work-documents';

    if ('WORK_REPORT' === documentType) {
      url = 'work-report-entry-add/';
    } else if ('ROAD_CARD' === documentType) {
      url = 'road-card-entry-add/';
    }

    this.router.navigateByUrl(url, {state: {workReportEntry, workDocument, index}});
  }

  onSaveWorkDocumentEntries() {

    if (this.workDocumentForm.getRawValue().documentType === 'WORK_REPORT') {
      const workReportEntries = this.workReportEntryService.getWorkReportEntries();
      this.workReportEntryRepositoryService.createWorkReportEntry(workReportEntries).subscribe(
        data => {
          this.userMessages.length = 0;
          this.userMessages.push('Work Report entries have been updated.');
          history.state.isSaveEntriesButtonVisible = false;
          history.state.isAddNewWorkDocumentEntryButtonVisible = false;
          setTimeout(() => {
            this.userMessages.length = 0;
            this.router.navigateByUrl('work-documents');
          }, 2000);
        },
        err => {
          this.userMessages.length = 0;
          const errors = Object.values(err.error);
          for (const error of errors) {
            this.userMessages.push(error);
          }
          history.state.isSaveEntriesButtonVisible = false;
          history.state.isAddNewWorkDocumentEntryButtonVisible = false;
        }
      );

    } else if (this.workDocumentForm.getRawValue().documentType === 'ROAD_CARD') {
      const roadCardEntries = this.roadCardEntryService.getRoadCardEntries();
      this.roadCardEntryRepositoryService.createRoadCardEntry(roadCardEntries).subscribe(
        data => {
          this.userMessages.length = 0;
          this.userMessages.push('Road Card entries have been updated.');
          history.state.isSaveEntriesButtonVisible = false;
          history.state.isAddNewWorkDocumentEntryButtonVisible = false;
          setTimeout(() => {
            this.userMessages.length = 0;
            this.router.navigateByUrl('work-documents');
          }, 2000);
        },
        err => {
          this.userMessages.length = 0;
          const errors = Object.values(err.error);
          for (const error of errors) {
            this.userMessages.push(error);
          }
          history.state.isSaveEntriesButtonVisible = false;
          history.state.isAddNewWorkDocumentEntryButtonVisible = false;
        }
      );
    }


  }

  isWorkReport() {
    return (history.state.workDocument !== undefined && history.state.workDocument.documentType === 'WORK_REPORT')
      || history.state.workReportEntry !== undefined && history.state.workReportEntry;
  }

  isRoadCard() {
    return (history.state.workDocument !== undefined && history.state.workDocument.documentType === 'ROAD_CARD')
      || history.state.roadCardEntry !== undefined && history.state.roadCardEntry;
  }
}
