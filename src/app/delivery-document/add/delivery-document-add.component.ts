import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageStyler} from '../../utils/message-styler';
import {Router} from '@angular/router';
import {DeliveryDocumentRepositoryService} from '../repository-service/delivery-document-repository.service';
import {DeliveryDocument} from '../model/delivery-document.model';
import {BehaviorSubject} from 'rxjs';
import {Client} from '../../client/model/client.model';
import {HttpParams} from '@angular/common/http';
import {ClientRepositoryService} from '../../client/repository-service/client-repository.service';

@Component({
  selector: 'app-delivery-document-add',
  templateUrl: './delivery-document-add.component.html',
  styleUrls: ['./delivery-document-add.component.css']
})
export class DeliveryDocumentAddComponent implements OnInit {
  deliveryDocumentAddForm: FormGroup;
  isOnEdit = history.state.isOnEdit;
  messageStyler = MessageStyler;
  userMessages: any[] = [];
  contractorNames =[];
  contractors = new BehaviorSubject<Client[]>([]);
  selectedContractor: Client;


  constructor(private router: Router,
              private deliveryDocumentRepositoryService: DeliveryDocumentRepositoryService,
              private clientRepositoryService: ClientRepositoryService) {}

  ngOnInit(): void {
    const deliveryDocument: DeliveryDocument = history.state.deliveryDocument;

    // if (this.isOnEdit || history.state.shouldGetDataFromDb) {
    //   deliveryDocument = history.state.deliveryDocument;
    // } else if (history.state.isDocumentEntryOnEdit !== undefined && history.state.deliveryDocument) {
    //   deliveryDocument = history.state.deliveryDocumentEntry.deliveryDocument;
    // }

    if (history.state.isOnAddNewDeliveryDocument) {
      this.deliveryDocumentAddForm = new FormGroup({
        contractorName: new FormControl('', Validators.required),
        documentNumber: new FormControl('', Validators.required),
        date: new FormControl('', Validators.required)
      });
    } else if (this.isOnEdit) {
      this.deliveryDocumentAddForm = new FormGroup({
        contractorName: new FormControl({value: deliveryDocument.contractor.name, disabled: false}),
        documentNumber: new FormControl({value: deliveryDocument.documentNumber, disabled: false}),
        date: new FormControl({value: deliveryDocument.date, disabled: false})
      });

      this.selectedContractor = deliveryDocument.contractor;
    } else if (deliveryDocument === undefined) {
      this.router.navigateByUrl('delivery-documents');
    } else {
      this.deliveryDocumentAddForm = new FormGroup({
        contractorName: new FormControl({value: deliveryDocument.contractor.name, disabled: true}),
        documentNumber: new FormControl({value: deliveryDocument.documentNumber, disabled: true}),
        date: new FormControl({value: deliveryDocument.date, disabled: true})
      });
    }

    const params = new HttpParams({});
    this.clientRepositoryService.getClients(params).subscribe(response => {
      this.contractors.next(Object.values(response)[0]);

      const contractors = this.contractors.getValue();
      for (const contractor of contractors) {
        this.contractorNames.push(contractor.name);
      }
    });
  }

  onSubmit() {
    const newDeliveryDocument = new DeliveryDocument(
      this.selectedContractor,
      this.deliveryDocumentAddForm.value.documentNumber,
      this.deliveryDocumentAddForm.value.date
    );

    if (this.isOnEdit) {
      const id = history.state.deliveryDocument.id;
      this.deliveryDocumentRepositoryService.updateDeliveryDocument(id, newDeliveryDocument).subscribe(
        data => {
          this.userMessages.length = 0;
          this.userMessages.push('Delivery document { ' + Object.values(data).splice(1, 2).toString() + ' } has been updated.');
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
      this.deliveryDocumentRepositoryService.createDeliveryDocument(newDeliveryDocument).subscribe(
        data => {
          this.userMessages.length = 0;
          this.userMessages.push('Delivery document { ' + Object.values(data).splice(1, 2).toString() + ' } has been created.');
          history.state.isOnAddNewWorkDocument = false;
          history.state.deliveryDocument = newDeliveryDocument;
          history.state.isAddNewDeliveryEntryButtonVisible = true;
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

  onAddDeliveryDocumentEntry() {
    const deliveryDocument = history.state.deliveryDocument;
    this.router.navigateByUrl('delivery-document-entry-add/', {state: {deliveryDocument}});
  }

  chooseContractor(selectedContractorName: {}) {
    for (const contractor of this.contractors.getValue()) {
      if (contractor.name === selectedContractorName) {
        this.selectedContractor = contractor;
        break;
      }
    }
  }
}
