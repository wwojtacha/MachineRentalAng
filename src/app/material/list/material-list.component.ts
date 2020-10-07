import {Component, OnInit} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {Material} from '../model/material.model';
import {MaterialRepositoryService} from '../repository-service/material-repository.service';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.css']
})
export class MaterialListComponent implements OnInit {

  materials = new BehaviorSubject<Material[]>([]);
  materialListForm: FormGroup;

  constructor(private materialRepositoryService: MaterialRepositoryService, private router: Router) {}

  ngOnInit(): void {

    this.materialListForm = new FormGroup({
      type: new FormControl('')
    });
  }

  onSearch() {

    const params = new HttpParams({
      fromObject: {
        material: this.materialListForm.value.type
      }
    });

    this.materialRepositoryService.getMaterials(params).subscribe(response => {
      this.materials.next(Object.values(response)[0]);
    });
  }

  onEditMaterial(material: Material) {
    this.router.navigateByUrl('material-add/', {state: {material}});
  }


}
