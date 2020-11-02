import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MachineType} from '../model/machine-type.model';
import {MachineTypeRepositoryService} from '../repository-service/machine-type-repository.service';
import {MessageStyler} from '../../utils/message-styler';

@Component({
  selector: 'app-machine-type-add',
  templateUrl: './machine-type-add.component.html',
  styleUrls: ['./machine-type-add.component.css']

})
export class MachineTypeAddComponent implements OnInit {

  machineTypeForm: FormGroup;
  isOnEdit = history.state.machineType !== undefined;
  machineType: MachineType = history.state.machineType;
  userMessage;
  messageStyler = MessageStyler;

  constructor(private machineTypeRepositoryService: MachineTypeRepositoryService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {

    if (this.isOnEdit) {
      this.machineTypeForm = new FormGroup({
        machineType: new FormControl(this.machineType.machineType, Validators.required),
        costCategory: new FormControl(this.machineType.costCategory, Validators.required)
      });
    } else {
      this.machineTypeForm = new FormGroup({
        machineType: new FormControl('', Validators.required),
        costCategory: new FormControl('', Validators.required)
      });
    }

  }

  onSubmit() {
    const newMachineType = new MachineType(
      this.machineTypeForm.value.machineType,
      this.machineTypeForm.value.costCategory
    );

    if (this.isOnEdit) {
      this.machineTypeRepositoryService.update(this.machineType.id, newMachineType).subscribe(
        data => {
          this.userMessage = 'Machine type has been updated.';
          // this.router.navigate(['machines/']);
        },
        err => {
          this.userMessage = Object.values(err.error)[0];
        }
      );
    } else {
      this.machineTypeRepositoryService.createMachineType(newMachineType).subscribe(
        data => {
          this.userMessage = 'Machine type { ' + Object.values(data).splice(1, 1).toString() + ' } has been created.';
          this.machineTypeForm.reset();
        },
        err => {
          this.userMessage = Object.values(err.error)[0];
        }
      );
    }
  }
}
