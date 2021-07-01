import {Component, OnInit} from '@angular/core';
import {Machine} from '../model/machine.model';
import {MachineRepositoryService} from '../repository-service/machine-repository.service';
import {MachineTypeRepositoryService} from '../../machine-type/repository-service/machine-type-repository.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageStyler} from '../../utils/message-styler';
import {BehaviorSubject} from 'rxjs';
import {MachineType} from '../../machine-type/model/machine-type.model';
import {HttpParams} from '@angular/common/http';
import {ClientRepositoryService} from '../../client/repository-service/client-repository.service';
import {Client} from '../../client/model/client.model';
import {TranslationService} from '../../translation/translation.service';

@Component({
  selector: 'app-machine-add',
  templateUrl: './machine-add.component.html',
  styleUrls: ['./machine-add.component.css']
})
export class MachineAddComponent implements OnInit {

  isOnEdit = history.state.machine !== undefined;
  machineForm: FormGroup;
  machineTypes = new BehaviorSubject<MachineType[]>([]);
  machine: Machine = history.state.machine;
  userMessage;
  messageStyler = MessageStyler;
  isMachineTypeShown = !this.isOnEdit;
  isOwnerShown = !this.isOnEdit;
  owners = new BehaviorSubject<Client[]>([]);

  constructor(private machineTypeRepositoryService: MachineTypeRepositoryService,
              private machineRepositoryService: MachineRepositoryService,
              private clientRepositoryService: ClientRepositoryService,
              public translationService: TranslationService) {
  }

  ngOnInit() {

    this.getMachineTypes();

    const queryParams = new HttpParams({});
    this.clientRepositoryService.getClients(queryParams).subscribe(response => this.owners.next(Object.values(response)[0]));

    this.initializeForm();
  }

  initializeForm() {

    let internalId = '';
    let name = '';
    let model = '';
    let machineType = null;
    let producer = '';
    let productionYear = null;
    let owner = null;
    let machineStatus = '';
    let quantity = 1;

    if (this.isOnEdit) {
        internalId = this.machine.internalId;
        name = this.machine.name;
        model = this.machine.model;
        machineType = this.machine.machineType;
        producer = this.machine.producer;
        productionYear = this.machine.productionYear;
        owner = this.machine.owner;
        machineStatus = this.machine.machineStatus;
        quantity = this.machine.totalPhysicalQuantity;

        this.machineForm = new FormGroup({
          internalId: new FormControl(internalId, Validators.required),
          name: new FormControl(name, Validators.required),
          model: new FormControl(model, Validators.required),
          editedMachineType: new FormControl({value: this.machine.machineType.machineType, disabled: true}),
          machineType: new FormControl(machineType, Validators.required),
          producer: new FormControl(producer, Validators.required),
          productionYear: new FormControl(productionYear, Validators.required),
          owner: new FormControl(owner, Validators.required),
          editedOwner: new FormControl({value: this.machine.owner.name, disabled: true}),
          machineStatus: new FormControl(machineStatus, Validators.required),
          quantity: new FormControl(quantity, Validators.required)
        });
    } else {
      this.machineForm = new FormGroup({
        internalId: new FormControl(internalId, Validators.required),
        name: new FormControl(name, Validators.required),
        model: new FormControl(model, Validators.required),
        editedMachineType: new FormControl({value: null, disabled: true}),
        machineType: new FormControl(machineType, Validators.required),
        producer: new FormControl(producer, Validators.required),
        productionYear: new FormControl(productionYear, Validators.required),
        owner: new FormControl('', Validators.required),
        editedOwner: new FormControl({value: null, disabled: true}),
        machineStatus: new FormControl(machineStatus, Validators.required),
        quantity: new FormControl(quantity, Validators.required)
      });
    }
  }

  onSubmit() {
    const newMachine = new Machine(
      this.machineForm.value.internalId,
      this.machineForm.value.name,
      this.machineForm.value.model,
      this.machineForm.value.machineType,
      this.machineForm.value.producer,
      this.machineForm.value.productionYear,
      this.machineForm.value.owner,
      this.machineForm.value.machineStatus,
      this.machineForm.value.quantity);

    if (this.isOnEdit) {
      this.machineRepositoryService.updateMachine(this.machine.id, newMachine).subscribe(
        data => {
          this.userMessage = 'Machine { ' + Object.values(data).splice(1, 1).toString() + ' } has been updated.';
          // this.router.navigate(['machines/']);
        },
        err => {
          this.userMessage = Object.values(err.error)[0];
        }
      );
    } else {
      this.machineRepositoryService.createMachine(newMachine).subscribe(
        data => {
          this.userMessage = 'Machine { ' + Object.values(data).splice(1, 4).toString() + ' } has been created.';
          this.machineForm.reset();
        },
        err => {
          this.userMessage = Object.values(err.error)[0];
        }
        );
    }
  }

  getMachineTypes() {
    this.machineTypeRepositoryService.getMachineTypes()
    .subscribe(machineTypeObject => {
      this.machineTypes.next(Object.values(machineTypeObject)[0]);
    });
  }

  enableMachineTypeSelect() {
    this.isMachineTypeShown = true;
  }

  onSelectMachineType(machineType: any) {

    if (this.isOnEdit) {
      this.machineForm.patchValue({
        editedMachineType: machineType.machineType
      });

      this.isMachineTypeShown = false;
    }
  }

  enableOwnerSelect() {
    this.isOwnerShown = true;
  }

  onSelectOwner(owner: any) {

    if (this.isOnEdit) {
      this.machineForm.patchValue({
        editedOwner: owner.name
      });

      this.isOwnerShown = false;
    }
  }

  styleElementToChange() {
    if (this.isOnEdit) {
      return {'background-color': 'blue', color: 'white'};
    }
  }

}
