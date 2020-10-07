import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {CostCode} from '../model/costcode.model';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {CostCodeRepositoryService} from '../repository-service/cost-code-repository.service';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-costcode-list',
  templateUrl: './costcode-list.component.html',
  styleUrls: ['./costcode-list.component.css']
  })
export class CostCodeListComponent implements OnInit {
  costCodes = new BehaviorSubject<CostCode[]>([]);
  costCodeListForm: FormGroup;

  constructor(private costCodeRepositoryService: CostCodeRepositoryService, private router: Router) {}

  ngOnInit(): void {
    this.costCodeListForm = new FormGroup({
      projectCode: new FormControl(''),
      costType: new FormControl(''),
    });
  }

  onSearch() {

    const params = new HttpParams({
      fromObject: {
        projectCode: this.costCodeListForm.value.projectCode,
        costType: this.costCodeListForm.value.costType
      }
    });

    this.costCodeRepositoryService.getCostCodes(params).subscribe(response => {
      this.costCodes.next(Object.values(response)[0]);
    });
  }

  onEditCostCode(costCode: CostCode) {
    this.router.navigateByUrl('cost-code-add/', {state: {costCode}});
  }
}
