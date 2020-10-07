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

@Component({
  selector: 'app-machine-list',
  templateUrl: './machine-list.component.html',
  styleUrls: ['./machine-list.component.css']
})
export class MachineListComponent implements OnInit {
  machines;
  machineListForm: FormGroup;
  machineTypes = new BehaviorSubject<MachineType[]>([]);
  owners = new BehaviorSubject<Client[]>([]);

  constructor(private machineRepositoryService: MachineRepositoryService,
              private machineTypeRepositoryService: MachineTypeRepositoryService,
              private clientRepositoryService: ClientRepositoryService,
              private router: Router) {
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
    .subscribe((machineObject) => {
      this.machines = Object.values(machineObject)[0];
    });
  }

  onEditMachine(machine: Machine) {
    this.router.navigateByUrl('machine-add/', {state: {machine}});
  }
}
