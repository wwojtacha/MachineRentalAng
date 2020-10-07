import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageStyler} from '../../utils/message-styler';
import {ActivatedRoute} from '@angular/router';
import {Seller} from '../model/seller.model';
import {SellerRepositoryService} from '../repository-service/seller-repository.service';

@Component({
  selector: 'app-seller-add',
  templateUrl: './seller-add.component.html',
  styleUrls: ['./seller-add.component.css']
})
export class SellerAddComponent implements OnInit {

  isOnEdit = history.state.seller !== undefined;
  sellerForm: FormGroup;
  seller: Seller = history.state.seller;
  messageStyler = MessageStyler;
  userMessage;

  constructor(private route: ActivatedRoute, private sellerRepositoryService: SellerRepositoryService) {}

  ngOnInit(): void {

    this.initializeForm();
  }

  private initializeForm() {

    let mpk = '';
    let name = '';
    let city = '';
    let street = '';
    let buildingNumber = '';
    let postalCode = '';

    if (this.isOnEdit) {

        mpk = this.seller.mpk;
        name = this.seller.name;
        city = this.seller.city;
        street = this.seller.street;
        buildingNumber = this.seller.buildingNumber;
        postalCode = this.seller.postalCode;

        this.sellerForm = new FormGroup({
          mpk: new FormControl(mpk, Validators.required),
          name: new FormControl(name, Validators.required),
          city: new FormControl(city, Validators.required),
          street: new FormControl(street, Validators.required),
          buildingNumber: new FormControl(buildingNumber, Validators.required),
          postalCode: new FormControl(postalCode, Validators.required),
        });
    } else {
      this.sellerForm = new FormGroup({
        mpk: new FormControl(mpk, Validators.required),
        name: new FormControl(name, Validators.required),
        city: new FormControl(city, Validators.required),
        street: new FormControl(street, Validators.required),
        buildingNumber: new FormControl(buildingNumber, Validators.required),
        postalCode: new FormControl(postalCode, Validators.required),
      });
    }
  }

  onSubmit() {

    const newSeller = new Seller(
      this.sellerForm.value.mpk,
      this.sellerForm.value.name,
      this.sellerForm.value.city,
      this.sellerForm.value.street,
      this.sellerForm.value.buildingNumber,
      this.sellerForm.value.postalCode,
    );

    if (this.isOnEdit) {
      this.sellerRepositoryService.updateSeller(this.seller.id, newSeller).subscribe(
        data => {
          this.userMessage = 'Seller { ' + Object.values(data).splice(1, 2).toString() + ' } has been updated.';
        },
        err => {
          this.userMessage = Object.values(err.error)[0];
        }
      );
    } else {
      this.sellerRepositoryService.createSeller(newSeller).subscribe(
        data => {
          this.userMessage = 'Seller { ' + Object.values(data).splice(1, 6).toString() + ' } has been created.';
          this.sellerForm.reset();
        },
        err => {
          this.userMessage = Object.values(err.error)[0];
        }
      );
    }
  }
}
