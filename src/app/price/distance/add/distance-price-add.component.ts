import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MessageStyler} from '../../../utils/message-styler';
import {DistancePriceRepositoryService} from '../repository-service/distance-price-repository.service';

@Component({
  selector: 'app-distance-price-add',
  templateUrl: './distance-price-add.component.html',
  styleUrls: ['./distance-price-add.component.css']
})
export class DistancePriceAddComponent implements OnInit {
  priceAddForm: FormGroup;
  userMessage;
  isFile = false;
  isError = false;
  messageStyler = MessageStyler;

  constructor(private distancePriceRepositoryService: DistancePriceRepositoryService, private formBuilder: FormBuilder) {}

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

    this.distancePriceRepositoryService.uploadFile(formData).subscribe(
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
