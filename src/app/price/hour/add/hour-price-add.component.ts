import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MessageStyler} from '../../../utils/message-styler';
import {HourPriceRepositoryService} from '../repository-service/hour-price-repository.service';

@Component({
  selector: 'app-hour-price-add',
  templateUrl: './hour-price-add.component.html',
  styleUrls: ['./hour-price-add.component.css']
})
export class HourPriceAddComponent implements OnInit {
  priceAddForm: FormGroup;
  userMessage;
  isFile = false;
  isError = false;
  messageStyler = MessageStyler;

  constructor(private hourPriceRepositoryService: HourPriceRepositoryService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.priceAddForm = this.formBuilder.group({
      priceFile: [null]
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.priceAddForm.patchValue({
        priceFile: file
      });
      this.priceAddForm.get('priceFile').updateValueAndValidity();
      this.isFile = true;
    }
  }

  onSubmit() {

    const formData = new FormData();
    formData.append('file', this.priceAddForm.get('priceFile').value);

    this.hourPriceRepositoryService.uploadFile(formData).subscribe(
      data => {
        this.userMessage = 'Price list has been saved.';
        this.isError = false;
        this.priceAddForm.reset();
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
