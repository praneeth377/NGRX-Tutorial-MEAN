import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Associate, AssociateResponse1 } from '../store/models/associate.model';

@Injectable({
  providedIn: 'root'
})
export class AssociateService {

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/getAllAssociates');
  }

  getDatabyId(id: string): Observable<any> {
    return this.http.get<any>('http://localhost:3000/associatesById/' + id);
  }

  postData(associate: Associate): Observable<any> {
    return this.http.post<any>('http://localhost:3000/addAssociate', associate);
  }

  updateData(id: string, associate: Associate): Observable<any> {
    return this.http.put<any>('http://localhost:3000/updateAssociate/' + id, associate);
  }

  deleteData(id: string): Observable<any> {
    return this.http.delete<any>('http://localhost:3000/deleteAssociate/' + id);
  }

}
