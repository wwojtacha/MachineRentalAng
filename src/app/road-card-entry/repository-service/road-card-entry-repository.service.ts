import {Injectable} from '@angular/core';
import {UrlKeeper} from '../../utils/url-keeper';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RoadCardEntry} from '../model/road-card-entry.model';

@Injectable()
export class RoadCardEntryRepositoryService {
  url = UrlKeeper;

  constructor(private http: HttpClient) {}

  createRoadCardEntry(roadCardEntries: RoadCardEntry[]) {
    return this.http.post(this.url.ROAD_CARD_ENTRIES, roadCardEntries);
  }

  getRoadCardEntries(params: HttpParams) {
    return this.http.get(this.url.ROAD_CARD_ENTRIES, {params});
  }

  deleteRoadCardEntry(id: number) {
    return this.http.delete(this.url.ROAD_CARD_ENTRIES + id);
  }
}
