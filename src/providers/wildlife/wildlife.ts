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
    return this.http.get(this.apiRoot + "classes");
  }

  getAllCreatures(): Observable<any[]> {
    return this.http.get(this.apiRoot + "creature")
      .map((res: Response) => JSON.parse(res.json()));
  }

  getCreaturesForClass(classId): Observable<any[]> {
    return this.http.get(this.apiRoot + "creature?classId=" + classId)
      .map((res: Response) => JSON.parse(res.json()));
  }

}
