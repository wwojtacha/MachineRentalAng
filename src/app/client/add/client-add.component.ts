import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Client} from '../model/client.model';
import {ClientRepositoryService} from '../repository-service/client-repository.service';
import {MessageStyler} from '../../utils/message-styler';
import {TranslationService} from '../../translation/translation.service';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.css']
})
export class ClientAddComponent implements OnInit {

  isOnEdit = history.state.client !== undefined;
  clientForm: FormGroup;
  client: Client = history.state.client;
  messageStyler = MessageStyler;
  userMessage;

  constructor(private clientRepositoryService: ClientRepositoryService,
              public translationService: TranslationService) {
  }

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
    let email = '';
    let contactPerson = '';
    let phoneNumber = '';


    if (this.isOnEdit) {

      mpk = this.client.mpk;
      name = this.client.name;
      city = this.client.city;
      street = this.client.street;
      buildingNumber = this.client.buildingNumber;
      postalCode = this.client.postalCode;
      email = this.client.email;
      contactPerson = this.client.contactPerson;
      phoneNumber = this.client.phoneNumber;

      this.clientForm = new FormGroup({
        mpk: new FormControl(mpk, Validators.required),
        name: new FormControl(name, Validators.required),
        city: new FormControl(city, Validators.required),
        street: new FormControl(street, Validators.required),
        buildingNumber: new FormControl(buildingNumber, Validators.required),
        postalCode: new FormControl(postalCode, Validators.required),
        email: new FormControl(email, Validators.required),
        contactPerson: new FormControl(contactPerson, Validators.required),
        phoneNumber: new FormControl(phoneNumber, Validators.required)
      });
    } else {
      this.clientForm = new FormGroup({
        mpk: new FormControl(mpk, Validators.required),
        name: new FormControl(name, Validators.required),
        city: new FormControl(city, Validators.required),
        street: new FormControl(street, Validators.required),
        buildingNumber: new FormControl(buildingNumber, Validators.required),
        postalCode: new FormControl(postalCode, Validators.required),
        email: new FormControl(email, Validators.required),
        contactPerson: new FormControl(contactPerson, Validators.required),
        phoneNumber: new FormControl(phoneNumber, Validators.required)
      });
    }
  }

  onSubmit() {

    const newClient = new Client(
      this.clientForm.value.mpk,
      this.clientForm.value.name,
      this.clientForm.value.city,
      this.clientForm.value.street,
      this.clientForm.value.buildingNumber,
      this.clientForm.value.postalCode,
      this.clientForm.value.email,
      this.clientForm.value.contactPerson,
      this.clientForm.value.phoneNumber
    );

    if (this.isOnEdit) {
      this.clientRepositoryService.updateClient(this.client.id, newClient).subscribe(
        data => {
          this.userMessage = 'Client { ' + Object.values(data).splice(1, 2).toString() + ' } has been updated.';
        },
        err => {
          this.userMessage = Object.values(err.error)[0];
        }
      );
    } else {
      this.clientRepositoryService.createClient(newClient).subscribe(
        data => {
          this.userMessage = 'Client { ' + Object.values(data).splice(1, 9).toString() + ' } has been created.';
          this.clientForm.reset();
        },
        err => {
          this.userMessage = Object.values(err.error)[0];
        }
      );
    }
  }
}
