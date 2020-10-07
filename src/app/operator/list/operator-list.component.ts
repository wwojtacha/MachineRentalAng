import {Component, OnInit} from '@angular/core';
import {Operator} from '../model/operator.model';
import {FormControl, FormGroup} from '@angular/forms';
import {Client} from '../../client/model/client.model';
import {ClientRepositoryService} from '../../client/repository-service/client-repository.service';
import {HttpParams} from '@angular/common/http';
import {OperatorRepositoryService} from '../repository-service/operator-repository.service';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-operator-list',
  templateUrl: './operator-list.component.html',
  styleUrls: ['./operator-list.component.css']
})
export class OperatorListComponent implements OnInit {
  operators = new BehaviorSubject<Operator[]>([]);
  operatorListForm: FormGroup;
  companies: Client[];
  selectedCompany = '';

  constructor(private companyRepositoryService: ClientRepositoryService,
              private operatorRepositoryService: OperatorRepositoryService,
              private router: Router) {}

  ngOnInit(): void {

    this.operatorListForm = new FormGroup({
      operatorName: new FormControl(''),
      qualifications: new FormControl(''),
      company: new FormControl(''),
    });

    const params = new HttpParams({});

    this.companyRepositoryService.getClients(params).subscribe(response => this.companies = Object.values(response)[0]);
  }

  onSearch() {

    const params = new HttpParams({
      fromObject: {
        name: this.operatorListForm.value.operatorName,
        qualifications: this.operatorListForm.value.qualifications,
        companyMpk: this.selectedCompany,
      }
    });

    this.operatorRepositoryService.getOperators(params).subscribe(response => {
      this.operators.next(Object.values(response)[0]);
    });

  }

  onSelectCompany(company: any) {
    if (company === undefined || company === null || company === '') {
      this.selectedCompany = '';
    } else {
      this.selectedCompany = company.mpk;
    }
  }

  onEditOperator(operator: Operator) {
    this.router.navigateByUrl('operator-add/', {state : {operator}});
  }

  // formatQualifications(qualifications: string) {
  //   let qualifications[] = qualifications.split(',');
  // }
}
