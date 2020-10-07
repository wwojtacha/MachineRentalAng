import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {UrlKeeper} from '../../utils/url-keeper';
import {Material} from '../model/material.model';


@Injectable()
export class MaterialRepositoryService {

  private url = UrlKeeper;

  constructor(private http: HttpClient) {}

  getMaterials(params: HttpParams) {
    return this.http.get(this.url.MATERIALS, {params});
  }

  createMaterial(material: Material) {
    return this.http.post(this.url.MATERIALS, material);
  }

  updateMaterial(id: number, material: Material) {
    return this.http.put(this.url.MATERIALS + id, material);
  }
}
