import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Seller} from '../model/seller.model';
import {Router} from '@angular/router';
import {HttpParams} from '@angular/common/http';
import {SellerRepositoryService} from '../repository-service/seller-repository.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.component.html',
  styleUrls: ['./seller-list.component.css']
  })
export class SellerListComponent implements OnInit {

  sellerListForm: FormGroup;
  sellers = new BehaviorSubject<Seller[]>([]);

  constructor(private router: Router, private sellerRepositoryService: SellerRepositoryService) {}

  ngOnInit(): void {

    this.sellerListForm = new FormGroup({
      mpk: new FormControl(''),
      name: new FormControl(''),
      city: new FormControl('')
    });
  }

  onSearch() {

    const params = new HttpParams({
      fromObject: {
        mpk: this.sellerListForm.value.mpk,
        name: this.sellerListForm.value.name,
        city: this.sellerListForm.value.city
      }
    });

    this.sellerRepositoryService.getSellers(params).subscribe(response => {
      this.sellers.next(Object.values(response)[0]);
    });
  }

  onEditClient(seller: Seller) {
    this.router.navigateByUrl('seller-add/', {state : {seller}});
  }
}
