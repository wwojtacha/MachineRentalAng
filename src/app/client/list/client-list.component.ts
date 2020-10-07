import {Component, OnInit} from '@angular/core';
import {ClientRepositoryService} from '../repository-service/client-repository.service';
import {HttpParams} from '@angular/common/http';
import {Client} from '../model/client.model';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  clients = new BehaviorSubject<Client[]>([]);
  clientListForm: FormGroup;

  constructor(private clientRepositoryService: ClientRepositoryService, private router: Router) {}

  ngOnInit(): void {

    this.clientListForm = new FormGroup({
      mpk: new FormControl(''),
      name: new FormControl(''),
      city: new FormControl(''),
      email: new FormControl(''),
      contactPerson: new FormControl(''),
      phoneNumber: new FormControl('')
    });
  }

  onSearch() {

    const params = new HttpParams({
      fromObject: {
        mpk: this.clientListForm.value.mpk,
        name: this.clientListForm.value.name,
        city: this.clientListForm.value.city,
        email: this.clientListForm.value.email,
        contactPerson: this.clientListForm.value.contactPerson,
        phoneNumber: this.clientListForm.value.phoneNumber
      }
    });

    this.clientRepositoryService.getClients(params).subscribe(response => {
      this.clients.next(Object.values(response)[0]);
    });
  }

  onEditClient(client: Client) {
    this.router.navigateByUrl('client-add/', {state: {client}});
  }


}
