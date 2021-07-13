import {Component, OnInit} from '@angular/core';
import {MessageStyler} from '../../utils/message-styler';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CostCode} from '../model/costcode.model';
import {CostCodeRepositoryService} from '../repository-service/cost-code-repository.service';
import {TranslationService} from '../../translation/translation.service';

@Component({
  selector: 'app-costcode-add',
  templateUrl: './costcode-add.component.html',
  styleUrls: ['./costcode-add.component.css']
  })
export class CostCodeAddComponent implements OnInit {
  costCodeForm: FormGroup;
  isOnEdit = history.state.costCode !== undefined;
  costCode: CostCode = history.state.costCode;
  messageStyler = MessageStyler;
  userMessage;


  constructor(private costCodeRepoitoryService: CostCodeRepositoryService,
              public translationService: TranslationService) {}

  ngOnInit(): void {
    if (this.isOnEdit) {
      this.costCodeForm = new FormGroup({
        projectCode: new FormControl(this.costCode.projectCode, Validators.required),
        costType: new FormControl(this.costCode.costType, Validators.required),
        projectCodeDescription: new FormControl(this.costCode.projectCodeDescription, Validators.required),
        costTypeDescription: new FormControl(this.costCode.costTypeDescription, Validators.required)
      });
    } else {
      this.costCodeForm = new FormGroup({
        projectCode: new FormControl('', Validators.required),
        costType: new FormControl('', Validators.required),
        projectCodeDescription: new FormControl('', Validators.required),
        costTypeDescription: new FormControl('', Validators.required)
      });
    }
  }

  onSubmit() {

    const costCode = new CostCode(
      this.costCodeForm.value.projectCode,
      this.costCodeForm.value.costType,
      this.costCodeForm.value.projectCodeDescription,
      this.costCodeForm.value.costTypeDescription
    );

    if (this.isOnEdit) {
      this.costCodeRepoitoryService.updateCostCode(this.costCode.id, costCode).subscribe(
        data => {
          this.userMessage = 'Cost code { ' + Object.values(data).splice(1, 2).toString() + ' } has been updated.';
        },
        err => {
          this.userMessage = Object.values(err.error)[0];
        }
      );
    } else {
      this.costCodeRepoitoryService.createCostCode(costCode).subscribe(
        data => {
          this.userMessage = 'Cost code { ' + Object.values(data).splice(1, 9).toString() + ' } has been created.';
          this.costCodeForm.reset();
        },
        err => {
          this.userMessage = Object.values(err.error)[0];
        }
      );
    }
  }
}
