import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

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

  getSightingsForLocation(locationId) {
    return this.http.get(this.apiRoot + "sighting?locationId=" + locationId )
    .map(res => res );
  }

  getImages(id, tripId, rating) {
    return this.http.get(this.apiRoot + "image?id=" + id + "&tripId=" + tripId + "&rating=" + rating)
    .map(res => res );
  }

  getUploadedImages() {
    return this.http.get(this.apiRoot + "image?uploads=1")
    .map(res => res );
  }

  getImagesForCreature(id, tripId, rating, creatureId) {
    return this.http.get(this.apiRoot + "image?id=" + id + "&tripId=" + tripId + "&rating=" + rating + "&creatureId=" + creatureId)
    .map(res => res );
  }

  updateImage(image){
    return this.http.put(this.apiRoot + "image", JSON.stringify(image))
    .map(res => res );
  }

  addImage(image){
    return this.http.post(this.apiRoot + "image", JSON.stringify(image))
    .map(res => res );
  }

  tagImage(image){
    return this.http.put(this.apiRoot + "tagImage", JSON.stringify(image))
    .map(res => res );
  }

  getStatsForCreature(creatureId){
    return this.http.get(this.apiRoot + "stats?type=all" +"&creatureId=" + creatureId)
    .map(res => res );
  }

  getStats(){
    return this.http.get(this.apiRoot + "stats?type=total")
    .map(res => res );
  }

  getFlightTimes(creatureId){
    return this.http.get(this.apiRoot + "flightTimes?" +"creatureId=" + creatureId)
    .map(res => res );
  }

  getAllFlightTimes(){
    return this.http.get(this.apiRoot + "flightTimes")
    .map(res => res );
  }

  getLocations(){
    return this.http.get(this.apiRoot + "location")
    .map(res => res );
  }

  saveLocation(location){
    return this.http.post(this.apiRoot + "location", JSON.stringify(location))
    .map(res => res );
  }

  updateLocation(location){
    return this.http.put(this.apiRoot + "location", JSON.stringify(location))
    .map(res => res );
  }

  getLocationTypes(){
    return this.http.get(this.apiRoot + "locationType")
    .map(res => res );
  }

  getLocationStats(locationId){
    return this.http.get(this.apiRoot + "locationStat/" + locationId)
    .map(res => res );
  }

  getTrips() {
    return this.http.get(this.apiRoot + "trip")
    .map(res => res );
  }

}
