import {Injectable} from '@angular/core';
import {RoadCardEntry} from '../model/road-card-entry.model';

@Injectable()
export class RoadCardEntryService {

  private roadCardEntries: RoadCardEntry[] = [];

  addRoadCardEntry(roadCardEntry: RoadCardEntry) {
    this.roadCardEntries.push(roadCardEntry);
  }

  getRoadCardEntries() {
    return this.roadCardEntries.slice();
  }

  clearRoadCardEntries() {
    this.roadCardEntries.length = 0;
  }

  addRoadCardEntries(roadCardEntries: RoadCardEntry[]) {
    this.roadCardEntries.push.apply(this.roadCardEntries, roadCardEntries);
  }

  updateRoadCardEntry(index: number, roadCardEntry: RoadCardEntry) {
    this.roadCardEntries[index] = roadCardEntry;
  }

  getRoadCardEntry(index: number) {
    return this.roadCardEntries.slice()[index];
  }

  deleteRoadCardEntry(index: number) {
    this.roadCardEntries.splice(index, 1);
  }
}
