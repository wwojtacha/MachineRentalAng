import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {EstimatePosition} from '../model/estimate.position';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {CostCode} from '../../costcode/model/costcode.model';
import {CostCodeRepositoryService} from '../../costcode/repository-service/cost-code-repository.service';
import {HttpParams} from '@angular/common/http';
import {EstimatePositionRepositoryService} from '../repository-service/estimate-position-repository.service';
import {TranslationService} from '../../translation/translation.service';

@Component({
  selector: 'app-estimate-position-list',
  templateUrl: './estimate-position-list.component.html',
  styleUrls: ['./estimate-position-list.component.css']
})
export class EstimatePositionListComponent implements OnInit {
  estimatePositionListForm: FormGroup;
  estimatePositions = new BehaviorSubject<EstimatePosition[]>([]);
  costCodes = new BehaviorSubject<CostCode[]>([]);
  costTypes: string[] = [];
  projectCodes = new Set();

  constructor(private router: Router,
              private costCodeRepositoryService: CostCodeRepositoryService,
              private estimatePositionRepositoryService: EstimatePositionRepositoryService,
              public translationService: TranslationService) {}




  ngOnInit(): void {

    this.estimatePositionListForm = new FormGroup({
      name: new FormControl(''),
      projectCode: new FormControl(''),
      costType: new FormControl(''),
      remarks: new FormControl('')
    });

    const costCodeParams = new HttpParams({});

    this.costCodeRepositoryService.getCostCodes(costCodeParams).subscribe(response => {
      this.costCodes.next(Object.values(response)[0]);

      const costCodes = this.costCodes.getValue();
      for (const costCode of costCodes) {
        this.projectCodes.add(costCode.projectCode);
      }
    });
  }

  onSearch() {
    const params = new HttpParams({
      fromObject: {
        name: this.estimatePositionListForm.value.name,
        projectCode: this.estimatePositionListForm.value.projectCode,
        costType: this.estimatePositionListForm.value.costType,
        remarks: this.estimatePositionListForm.value.remarks
      }
    });

    this.estimatePositionRepositoryService.getEstimatePositions(params).subscribe(response => {
      this.estimatePositions.next(Object.values(response)[0]);
    });
  }

  onEditEstimatePosition(estimatePosition: EstimatePosition) {
    this.router.navigateByUrl('estimate-position-edit/', {state: {estimatePosition}});
  }

  onSelectProjectCode(projectCode: any) {

    this.costTypes.length = 0;

    const costCodes = this.costCodes.getValue();
    for (const costCode of costCodes) {
      if (costCode.projectCode === projectCode) {
        this.costTypes.push(costCode.costType);
      }
    }
  }
}
