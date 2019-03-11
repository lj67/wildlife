import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Http, Response } from '@angular/http';

/*
  Generated class for the WildlifeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WildlifeProvider {
    

  apiRoot:string = 'https://www.newburyrealale.co.uk/nature/api/v1/';
  imageBaseUrl = "https://www.newburyrealale.co.uk/nature/images/";

  constructor(public http: HttpClient) {
    console.log('Hello WildlifeProvider Provider');
  }

  getClasses()  {
    return this.http.get(this.apiRoot + "classes")
      .map(res => res );
  }

  getAllCreatures() {
    return this.http.get(this.apiRoot + "creature")
    .map(res => res );
  }

  getCreaturesForClass(classId) {
    return this.http.get(this.apiRoot + "creature?classId=" + classId)
    .map(res => res );
  }

  saveSightings(sightings){
    return this.http.post(this.apiRoot + "sighting", JSON.stringify(sightings))
    .map(res => res );
  }

  updateSightings(sightings){
    return this.http.put(this.apiRoot + "sighting", JSON.stringify(sightings))
    .map(res => res );
  }

  getSightings() {
    return this.http.get(this.apiRoot + "sighting")
    .map(res => res );
  }

  getSightingsForCreature(creatureId) {
    return this.http.get(this.apiRoot + "sighting?creatureId=" + creatureId )
    .map(res => res );
  }

  getImages(id, tripId, rating) {
    return this.http.get(this.apiRoot + "image?id=" + id + "&tripId=" + tripId + "&rating=" + rating)
    .map(res => res );
  }

  getImagesForCreature(id, tripId, rating, creatureId) {
    return this.http.get(this.apiRoot + "image?id=" + id + "&tripId=" + tripId + "&rating=" + rating + "&creatureId=" + creatureId)
    .map(res => res );
  }

  getStatsForCreature(creatureId){
    return this.http.get(this.apiRoot + "stats?type=all?" +"&creatureId=" + creatureId)
    .map(res => res );
  }

  getFlightTimes(creatureId){
    return this.http.get(this.apiRoot + "flightTimes?" +"creatureId=" + creatureId)
    .map(res => res );
  }

  getLocations(){
    return this.http.get(this.apiRoot + "location")
    .map(res => res );
  }

}
