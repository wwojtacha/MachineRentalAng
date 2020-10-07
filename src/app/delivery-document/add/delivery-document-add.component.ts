import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageStyler} from '../../utils/message-styler';
import {Router} from '@angular/router';
import {DeliveryDocumentRepositoryService} from '../repository-service/delivery-document-repository.service';
import {DeliveryDocument} from '../model/delivery-document.model';

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


  constructor(private router: Router,
              private deliveryDocumentRepositoryService: DeliveryDocumentRepositoryService) {}

  ngOnInit(): void {
    const deliveryDocument: DeliveryDocument = history.state.deliveryDocument;

    // if (this.isOnEdit || history.state.shouldGetDataFromDb) {
    //   deliveryDocument = history.state.deliveryDocument;
    // } else if (history.state.isDocumentEntryOnEdit !== undefined && history.state.deliveryDocument) {
    //   deliveryDocument = history.state.deliveryDocumentEntry.deliveryDocument;
    // }

    if (history.state.isOnAddNewDeliveryDocument) {
      this.deliveryDocumentAddForm = new FormGroup({
        documentNumber: new FormControl('', Validators.required),
        date: new FormControl('', Validators.required)
      });
    } else if (this.isOnEdit) {
      this.deliveryDocumentAddForm = new FormGroup({
        documentNumber: new FormControl({value: deliveryDocument.documentNumber, disabled: false}),
        date: new FormControl({value: deliveryDocument.date, disabled: false})
      });
    } else if (deliveryDocument === undefined) {
      this.router.navigateByUrl('delivery-documents');
    } else {
      this.deliveryDocumentAddForm = new FormGroup({
        documentNumber: new FormControl({value: deliveryDocument.documentNumber, disabled: true}),
        date: new FormControl({value: deliveryDocument.date, disabled: true})
      });
    }
  }

  onSubmit() {
    const newDeliveryDocument = new DeliveryDocument(
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

  onSaveWorkDocumentEntries() {

  }
}
