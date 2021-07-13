import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageStyler} from '../../utils/message-styler';
import {ActivatedRoute} from '@angular/router';
import {ClientRepositoryService} from '../../client/repository-service/client-repository.service';
import {HttpParams} from '@angular/common/http';
import {Client} from '../../client/model/client.model';
import {Operator} from '../model/operator.model';
import {OperatorRepositoryService} from '../repository-service/operator-repository.service';
import {BehaviorSubject} from 'rxjs';
import {TranslationService} from "../../translation/translation.service";

@Component({
  selector: 'app-operator',
  templateUrl: './operator-add.component.html',
  styleUrls: ['./operator-add.component.css']
})
export class OperatorAddComponent implements OnInit {
  operatorForm: FormGroup;
  isOnEdit = history.state.operator !== undefined;
  isCompanyShown = !this.isOnEdit;
  companies = new BehaviorSubject<Client[]>([]);
  userMessages: any[] = [];
  messageStyler = MessageStyler;
  operator: Operator = history.state.operator;


  constructor(private route: ActivatedRoute,
              private companyRepositoryService: ClientRepositoryService,
              private operatorRepositoryService: OperatorRepositoryService,
              public translationService: TranslationService) {}



  ngOnInit(): void {
    const quaryParams = new HttpParams({});

    this.companyRepositoryService.getClients(quaryParams).subscribe(response => this.companies.next(Object.values(response)[0]));

    if (this.isOnEdit) {
        this.operatorForm = new FormGroup(
          {
            operatorName: new FormControl(this.operator.name, Validators.required),
            qualifications: new FormControl(this.operator.qualifications, Validators.required),
            editedCompany: new FormControl({value: this.operator.company.mpk, disabled: true}),
            company: new FormControl(this.operator.company, Validators.required)
          }
        );
    } else {
      this.operatorForm = new FormGroup({
        operatorName: new FormControl('', Validators.required),
        qualifications: new FormControl('', Validators.required),
        editedCompany: new FormControl({value: null, disabled: true}),
        company: new FormControl('', Validators.required)
      });
    }

  }

  onSubmit() {
    const newOperator = new Operator(
      this.operatorForm.value.operatorName,
      this.operatorForm.value.qualifications,
      this.operatorForm.value.company
    );

    if (this.isOnEdit) {
      this.operatorRepositoryService.updateOperator(this.operator.id, newOperator).subscribe(
        data => {
          this.userMessages.length = 0;
          this.userMessages.push('Operator { ' + Object.values(data).splice(1, 1).toString() + ' } has been updated.');
        },
        err => {
          this.userMessages.length = 0;
          const errors = Object.values(err.error);
          for (const error of errors) {
            this.userMessages.push(error);
          }
        }
      );
    } else {
      this.operatorRepositoryService.createOperator(newOperator).subscribe(
        data => {
          this.userMessages.length = 0;
          this.userMessages.push('Operator { ' + Object.values(data).splice(1, 1).toString() + ' } has been created.');
          this.operatorForm.reset();
        },
        err => {
          this.userMessages.length = 0;
          const errors = Object.values(err.error);
          for (const error of errors) {
            this.userMessages.push(error);
          }
        }
      );
    }
  }

  onSelectCompany(company: any) {

    if (this.isOnEdit) {
      this.operatorForm.patchValue({
        editedCompany: company.mpk
      });

      this.isCompanyShown = false;
    }
  }

  styleElementToChange() {
    if (this.isOnEdit) {
      return {'background-color': 'blue', color: 'white'};
    }
  }

  enableCompanySelect() {
    this.isCompanyShown = true;
  }
}
