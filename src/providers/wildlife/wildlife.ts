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

  apiRoot:string = 'http://www.newburyrealale.co.uk/nature/api/v1/';

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
    return this.http.post(this.apiRoot + "trip", JSON.stringify(sightings))
    .map(res => res );
  }

}
