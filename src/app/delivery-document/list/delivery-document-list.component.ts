import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {DeliveryDocumentRepositoryService} from '../repository-service/delivery-document-repository.service';
import {HttpParams} from '@angular/common/http';
import {ConfirmationDialogComponent} from '../../confirmation-dialog/confirmation-dialog.component';
import {ErrorDialogComponent} from '../../error-dialog/error-dialog.component';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {DeliveryDocument} from '../model/delivery-document.model';

@Component({
  selector: 'app-delivery-document-list',
  templateUrl: './delivery-document-list.component.html',
  styleUrls: ['./delivery-document-list.component.css']
})
export class DeliveryDocumentListComponent implements OnInit {
  deliveryDocumentListForm: FormGroup;
  deliveryDocuments = new BehaviorSubject<DeliveryDocument[]>([]);

  constructor(private deliveryDocumentRepositoryService: DeliveryDocumentRepositoryService,
              public dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit(): void {
    this.deliveryDocumentListForm = new FormGroup({
      documentNumber: new FormControl(''),
      date: new FormControl('')
    });

  }

  onAddNewDeliveryDocument() {
    const url = 'delivery-document-add';
    const isOnAddNewDeliveryDocument = true;
    this.router.navigateByUrl(url, {state: {isOnAddNewDeliveryDocument}});
  }

  onSearch() {

    const params = new HttpParams({
      fromObject: {
        documentNumber: this.deliveryDocumentListForm.value.documentNumber,
        date: this.deliveryDocumentListForm.value.date
      }
    });

    this.deliveryDocumentRepositoryService.getDeliveryDocuments(params).subscribe(response => {
      this.deliveryDocuments.next(Object.values(response)[0]);
    });
  }

  onEditDeliveryDocument(deliveryDocument: DeliveryDocument) {
    const isOnEdit = true;

    this.router.navigateByUrl('delivery-document-add/', {state: {deliveryDocument, isOnEdit}});
  }

  onDeleteDeliveryDocument(id: number, index: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Are you sure you want to delete ?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deliveryDocumentRepositoryService.deleteWorkDocument(id).subscribe(
          data => {
            this.deliveryDocuments.getValue().splice(index, 1);
          },
          err => {
            let userMessage;
            const entries = Object.entries(err.error);
            for (const entry of entries) {
              if (entry[0] === 'message') {
                userMessage = entry[1];
              }
            }

            this.dialog.open(ErrorDialogComponent, {
              width: '450px',
              data: userMessage
            });
          }
        );
      }
    });
  }

  onShowEntries(deliveryDocument: DeliveryDocument) {
    const url = 'delivery-document-add';

    const shouldGetDataFromDb = true;
    const areEntriesVisible = true;
    const isAddNewDeliveryEntryButtonVisible = true;
    this.router.navigateByUrl(url, {state: {deliveryDocument, shouldGetDataFromDb, areEntriesVisible, isAddNewDeliveryEntryButtonVisible}});
  }
}
