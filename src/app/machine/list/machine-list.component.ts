import {Component, OnInit} from '@angular/core';
import {MachineRepositoryService} from '../repository-service/machine-repository.service';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {MachineTypeRepositoryService} from '../../machine-type/repository-service/machine-type-repository.service';
import {HttpParams} from '@angular/common/http';
import {FormControl, FormGroup} from '@angular/forms';
import {Machine} from '../model/machine.model';
import {MachineType} from '../../machine-type/model/machine-type.model';
import {Client} from '../../client/model/client.model';
import {ClientRepositoryService} from '../../client/repository-service/client-repository.service';
import {ConfirmationDialogComponent} from '../../confirmation-dialog/confirmation-dialog.component';
import {ErrorDialogComponent} from '../../error-dialog/error-dialog.component';
import {MatDialog} from '@angular/material';
import {TranslationService} from '../../translation/translation.service';

@Component({
  selector: 'app-machine-list',
  templateUrl: './machine-list.component.html',
  styleUrls: ['./machine-list.component.css']
})
export class MachineListComponent implements OnInit {
  machines = new BehaviorSubject<Machine[]>([]);
  machineListForm: FormGroup;
  machineTypes = new BehaviorSubject<MachineType[]>([]);
  owners = new BehaviorSubject<Client[]>([]);

  translationMachine = 'dupa';

  constructor(private machineRepositoryService: MachineRepositoryService,
              private machineTypeRepositoryService: MachineTypeRepositoryService,
              private clientRepositoryService: ClientRepositoryService,
              private router: Router,
              public dialog: MatDialog,
              public translationService: TranslationService) {
  }


  ngOnInit() {

    this.machineListForm = new FormGroup({
      internalId: new FormControl(''),
      name: new FormControl(''),
      model: new FormControl(''),
      machineType: new FormControl(''),
      producer: new FormControl(''),
      productionYear: new FormControl(''),
      owner: new FormControl(''),
      machineStatus: new FormControl('')
    });

    this.machineTypeRepositoryService.getMachineTypes().subscribe(response => {
      this.machineTypes.next(Object.values(response)[0]);
    });

    const queryParams = new HttpParams({});
    this.clientRepositoryService.getClients(queryParams).subscribe(response => this.owners.next(Object.values(response)[0]));
  }

  onSearch() {

    const params = new HttpParams({
      fromObject: {
        internalId: this.machineListForm.value.internalId,
        name: this.machineListForm.value.name,
        model: this.machineListForm.value.model,
        machineType: this.machineListForm.value.machineType,
        producer: this.machineListForm.value.producer,
        productionYear: this.machineListForm.value.productionYear,
        owner: this.machineListForm.value.owner,
        machineStatus: this.machineListForm.value.machineStatus
      }
    });

    this.machineRepositoryService.getMachines(params)
    .subscribe(response => {
      this.machines.next(Object.values(response)[0]);
    });
  }

  onEditMachine(machine: Machine) {
    this.router.navigateByUrl('machine-add/', {state: {machine}});
  }

  onDeleteMachine(id: any, index: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Are you sure you want to delete ?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.machineRepositoryService.deleteMachine(id).subscribe(
          data => {
            this.machines.getValue().splice(index, 1);
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
    });
  }
}
