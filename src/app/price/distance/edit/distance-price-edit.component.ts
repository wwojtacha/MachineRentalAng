import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {MessageStyler} from '../../../utils/message-styler';
import {DistancePriceRepositoryService} from '../repository-service/distance-price-repository.service';
import {DistancePrice} from '../model/distance-price.model';
import {MachineRepositoryService} from '../../../machine/repository-service/machine-repository.service';
import {BehaviorSubject} from 'rxjs';
import {Machine} from '../../../machine/model/machine.model';
import {HttpParams} from '@angular/common/http';
import {CostCode} from '../../../costcode/model/costcode.model';
import {CostCodeRepositoryService} from '../../../costcode/repository-service/cost-code-repository.service';
import {DoubleDistancePrice} from '../model/double-distance-price.model';

@Component({
  selector: 'app-distance-price-edit',
  templateUrl: './distance-price-edit.component.html',
  styleUrls: ['./distance-price-edit.component.css']
})
export class DistancePriceEditComponent implements OnInit {

  price: DistancePrice = history.state.price;
  priceEditForm: FormGroup;
  userMessage;
  isError = false;
  messageStyler = MessageStyler;
  machines = new BehaviorSubject<Machine[]>([]);
  machineInternalIds = [];
  costCodes = new BehaviorSubject<CostCode[]>([]);
  projectCodes = new Set();
  isNewPriceShown = false;

  constructor(private route: ActivatedRoute,
              private distancePriceRepositoryService: DistancePriceRepositoryService,
              private machineRepositoryService: MachineRepositoryService,
              private costCodeRepositoryService: CostCodeRepositoryService) {
  }

  ngOnInit(): void {

    const workCode = this.price.workCode;
    const machineNumber = this.price.machineInternalId;
    const priceType = this.price.priceType;
    const price = this.price.price;
    const rangeMin = this.price.rangeMin;
    const rangeMax = this.price.rangeMax;
    const startDate = this.price.startDate;
    const endDate = this.price.endDate;
    const projectCode = this.price.projectCode;

    this.priceEditForm = new FormGroup({
      editedWorkCode: new FormControl(workCode, Validators.required),
      editedMachineNumber: new FormControl(machineNumber, Validators.required),
      editedPriceType: new FormControl(priceType, Validators.required),
      editedPriceValue: new FormControl(price, Validators.required),
      editedRangeMin: new FormControl(rangeMin, Validators.required),
      editedRangeMax: new FormControl(rangeMax, Validators.required),
      editedStartDate: new FormControl(startDate, Validators.required),
      editedEndDate: new FormControl(endDate, Validators.required),
      editedProjectCode: new FormControl(projectCode, Validators.required),
      newWorkCode: new FormControl({value: workCode, disabled: true}, Validators.required),
      newMachineNumber: new FormControl({value: machineNumber, disabled: true}, Validators.required),
      newPriceType: new FormControl({value: priceType, disabled: true}, Validators.required),
      newPriceValue: new FormControl(price, Validators.required),
      newRangeMin: new FormControl(rangeMin, Validators.required),
      newRangeMax: new FormControl(rangeMax, Validators.required),
      newStartDate: new FormControl('', Validators.required),
      newEndDate: new FormControl('', Validators.required),
      newProjectCode: new FormControl({value: projectCode, disabled: true}, Validators.required)
    });

    const params = new HttpParams({});

    this.costCodeRepositoryService.getCostCodes(params).subscribe(response => {
      this.costCodes.next(Object.values(response)[0]);

      const costCodes = this.costCodes.getValue();
      for (const costCode of costCodes) {
        this.projectCodes.add(costCode.projectCode);
      }
    });

    this.machineRepositoryService.getMachines(params).subscribe(response => {
      this.machines.next(Object.values(response)[0]);

      const machines = this.machines.getValue();
      for (const machine of machines) {
        this.machineInternalIds.push(machine.internalId);
      }
    });

  }

  onSubmit() {

    const price = new DistancePrice(
      this.priceEditForm.value.editedWorkCode,
      this.priceEditForm.value.editedMachineNumber,
      this.priceEditForm.value.editedPriceType,
      this.priceEditForm.value.editedPriceValue,
      this.priceEditForm.value.editedRangeMin,
      this.priceEditForm.value.editedRangeMax,
      this.priceEditForm.value.editedStartDate,
      this.priceEditForm.value.editedEndDate,
      this.priceEditForm.value.editedProjectCode
    );

    this.distancePriceRepositoryService.updatePrice(this.price.id, price).subscribe(
      (data: DistancePrice) => {
        this.isError = false;
        this.userMessage = 'Price { '
          + Object.values(data).splice(3, 6).toString()
          + ',' + Object.values(data).splice(0, 2).toString()
          + ' } has been updated.';
      },
      err => {
        this.isError = true;
        this.userMessage = err.error.message;
      }
    );
  }

  onAddNewPrice() {
    if (this.isNewPriceShown === false) {
      this.isNewPriceShown = true;
    } else if (this.isNewPriceShown) {
      this.isNewPriceShown = false;
    }
  }

  onCheckAndSavePrice() {

    const editedDistancePrice = new DistancePrice(
      this.price.workCode,
      this.price.machineInternalId,
      this.price.priceType,
      this.priceEditForm.value.editedPriceValue,
      this.priceEditForm.value.editedRangeMin,
      this.priceEditForm.value.editedRangeMax,
      this.priceEditForm.value.editedStartDate,
      this.priceEditForm.value.editedEndDate,
      this.price.projectCode
    );

    const newDistancePrice = new DistancePrice(
      this.price.workCode,
      this.price.machineInternalId,
      this.price.priceType,
      this.priceEditForm.value.newPriceValue,
      this.priceEditForm.value.newRangeMin,
      this.priceEditForm.value.newRangeMax,
      this.priceEditForm.value.newStartDate,
      this.priceEditForm.value.newEndDate,
      this.price.projectCode
    );

    const doubleDistancePrice = new DoubleDistancePrice(
      editedDistancePrice,
      newDistancePrice
    );

    this.distancePriceRepositoryService.updateOnDoublePriceChange(this.price.id, doubleDistancePrice).subscribe(
      data => {
        this.isError = false;
        this.userMessage = 'Prices have been updated and set to proper work report entries.';
      },
      err => {
        this.isError = true;
        this.userMessage = err.error.message;
      });

  }
}
