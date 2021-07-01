import {Component, OnDestroy, OnInit} from '@angular/core';
import {MachineTypeRepositoryService} from '../repository-service/machine-type-repository.service';
import {Router} from '@angular/router';
import {BehaviorSubject, Subscription} from 'rxjs';
import {MachineType} from '../model/machine-type.model';
import {TranslationService} from '../../translation/translation.service';

@Component({
  selector: 'app-machine-type-list',
  templateUrl: './machine-type-list.component.html',
  styleUrls: ['./machine-type-list.component.css']
})
export class MachineTypeListComponent implements OnInit, OnDestroy {

  machineTypes = new BehaviorSubject<MachineType[]>([]);
  filteredType = '';
  subscription: Subscription;

  constructor(private machineTypeRepositoryService: MachineTypeRepositoryService,
              private router: Router,
              public translationService: TranslationService) {
  }

  ngOnInit(): void {
    this.subscription = this.machineTypeRepositoryService.getMachineTypes()
    .subscribe(machineTypeObject => {
      this.machineTypes.next(Object.values(machineTypeObject)[0]);
    });
  }

  onEditMachineType(machineType: MachineType) {
    this.router.navigateByUrl('machine-type-add/', {state : {machineType}});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

