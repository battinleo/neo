import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { NearEarthObject } from '../model/NearEarthObject';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_KEY, API_ROOT, ApiObject } from '../data/api';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data$!: Observable<any>;
  public objects$!: Observable<NearEarthObject[]>;

  constructor(private http: HttpClient) {
    this.loadData();
  }

  loadData() {
    const today = new Date();
    const month = today.getMonth().toString().padStart(2, '0');
    const date = today.getDate().toString().padStart(2, '0');
    const todayString = `${today.getFullYear()}-${month}-${date}`;

    let params = new HttpParams();
    params = params.set('start_date', todayString);
    params = params.set('end_date', todayString);
    params = params.set('api_key', API_KEY);

    this.data$ = this.http.get(API_ROOT, { params });
    this.objects$ = this.data$.pipe(
      map((obj: any) => {
        return obj['near_earth_objects'][todayString]
          .map((apiObj: ApiObject) => NearEarthObject.fromApiObject(apiObj));
      })
    );
  }
}
