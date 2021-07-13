import {Component, OnInit} from '@angular/core';
import {MessageStyler} from '../../utils/message-styler';
import {FormBuilder, FormGroup} from '@angular/forms';
import {EstimatePositionRepositoryService} from '../repository-service/estimate-position-repository.service';
import {TranslationService} from '../../translation/translation.service';

@Component({
  selector: 'app-estimate-position-add',
  templateUrl: './estimate-position-add.component.html',
  styleUrls: ['./estimate-position-add.component.css']
})
export class EstimatePositionAddComponent implements OnInit {
  estimatePositionAddForm: FormGroup;
  isFile = false;
  isError = false;
  messageStyler = MessageStyler;
  userMessage;

  constructor(private estimatePositionRepositoryService: EstimatePositionRepositoryService,
              private formBuilder: FormBuilder,
              public translationService: TranslationService) {}

  ngOnInit(): void {
    this.estimatePositionAddForm = this.formBuilder.group({
      estimatePositionFile: [null]
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.estimatePositionAddForm.patchValue({
        estimatePositionFile: file
      });
      this.estimatePositionAddForm.get('estimatePositionFile').updateValueAndValidity();
      this.isFile = true;
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.estimatePositionAddForm.get('estimatePositionFile').value);

    this.estimatePositionRepositoryService.uploadFile(formData).subscribe(
      data => {
        this.userMessage = 'Estimate position(s) saved.';
        this.isError = false;
        this.estimatePositionAddForm.reset();
      },
      err => {
        const entries = Object.entries(err.error);
        for (const entry of entries) {
          if (entry[0] === 'message') {
            this.userMessage = entry[1];
            this.isError = true;
          }
        }
      }
    );
  }
}
