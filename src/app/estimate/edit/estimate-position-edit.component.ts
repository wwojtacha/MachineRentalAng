import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageStyler} from '../../utils/message-styler';
import {BehaviorSubject} from 'rxjs';
import {CostCode} from '../../costcode/model/costcode.model';
import {HttpParams} from '@angular/common/http';
import {CostCodeRepositoryService} from '../../costcode/repository-service/cost-code-repository.service';
import {EstimatePosition} from '../model/estimate.position';
import {EstimatePositionRepositoryService} from '../repository-service/estimate-position-repository.service';

@Component({
  selector: 'app-estimate-position-edit',
  templateUrl: './estimate-position-edit.component.html',
  styleUrls: ['./estimate-position-edit.component.css']
})
export class EstimatePositionEditComponent implements OnInit {
  estimatePositionEditForm: FormGroup;
  projectCodes = new Set();
  costTypes: string[] = [];
  messageStyler = MessageStyler;
  isError = false;
  userMessage;
  costCodes = new BehaviorSubject<CostCode[]>([]);
  estimatePosition = history.state.estimatePosition;

  constructor(private costCodeRepositoryService: CostCodeRepositoryService,
              private estimatePositionRepositoryService: EstimatePositionRepositoryService) {
  }

  ngOnInit(): void {
    this.estimatePositionEditForm = new FormGroup({
        name: new FormControl(this.estimatePosition.name, Validators.required),
        projectCode: new FormControl(this.estimatePosition.costCode.projectCode, Validators.required),
        costType: new FormControl(this.estimatePosition.costCode.costType, Validators.required),
        quantity: new FormControl(this.estimatePosition.quantity, Validators.required),
        measureUnit: new FormControl(this.estimatePosition.measureUnit, Validators.required),
        estimateSellPrice: new FormControl(this.estimatePosition.sellPrice, Validators.required),
        estimateSellValue: new FormControl({value: this.estimatePosition.sellValue, disabled: true}),
        remarks: new FormControl(this.estimatePosition.remarks, Validators.required),
        estimateCostPrice: new FormControl(this.estimatePosition.costPrice, Validators.required),
        estimateCostValue: new FormControl({value: this.estimatePosition.costValue, disabled: true}),
      }
    );

    const costCodeParams = new HttpParams({});

    this.costCodeRepositoryService.getCostCodes(costCodeParams).subscribe(response => {
      this.costCodes.next(Object.values(response)[0]);

      const costCodes = this.costCodes.getValue();
      for (const costCode of costCodes) {
        this.projectCodes.add(costCode.projectCode);
      }
    });

    this.costTypes.push(this.estimatePosition.costCode.costType);
  }

  onSubmit() {

    const fullCode = this.estimatePositionEditForm.value.projectCode + '-' + this.estimatePositionEditForm.value.costType;

    let newCostCode = {} as CostCode;
    const costCodes = this.costCodes.getValue();
    for (const costCode of costCodes) {
      if (costCode.projectCode + '-' + costCode.costType === fullCode) {
        newCostCode = costCode;
        break;
      }
    }


    const estimatePosition = new EstimatePosition(
      this.estimatePositionEditForm.value.name,
      newCostCode,
      this.estimatePositionEditForm.value.quantity,
      this.estimatePositionEditForm.value.measureUnit,
      this.estimatePositionEditForm.value.estimateSellPrice,
      this.estimatePositionEditForm.value.estimateSellValue,
      this.estimatePositionEditForm.value.remarks,
      this.estimatePositionEditForm.value.estimateCostPrice,
      this.estimatePositionEditForm.value.estimateCostValue,
    );

    this.estimatePositionRepositoryService.updateEstimatePosition(this.estimatePosition.id, estimatePosition).subscribe(
      data => {
        this.userMessage = 'Estimate position { ' + Object.values(data).splice(1, 1).toString() + '} has been updated.';
        this.isError = false;
      },
      err => {
        this.isError = true;
        this.userMessage = Object.values(err.error)[0];
      }
    );
  }

  onSelectProjectCode(projectCode: any) {
    this.costTypes.length = 0;

    const costCodes = this.costCodes.getValue();
    for (const costCode of costCodes) {
      if (costCode.projectCode === projectCode) {
        this.costTypes.push(costCode.costType);
      }
    }

    this.estimatePositionEditForm.patchValue({
      costType: ''
    });
  }

  onQuantityChange() {
    this.updateEstimateSellValue();
  }

  onSellPriceChange() {
    this.updateEstimateSellValue();
  }

  updateEstimateSellValue() {
    const sellPrice = this.estimatePositionEditForm.value.estimateSellPrice;
    const quantity = this.estimatePositionEditForm.value.quantity;

    this.estimatePositionEditForm.patchValue({
      estimateSellValue: sellPrice * quantity
    });
  }

  onCostPriceChange() {
    this.updateEstimateCostValue();
  }

  updateEstimateCostValue() {
    const costPrice = this.estimatePositionEditForm.value.estimateCostPrice;
    const quantity = this.estimatePositionEditForm.value.quantity;

    this.estimatePositionEditForm.patchValue({
      estimateCostValue: costPrice * quantity
    });
  }
}
