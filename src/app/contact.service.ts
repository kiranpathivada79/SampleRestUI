import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { contact } from './contact';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  url = 'http://localhost:65389/Api/Contact';
  constructor(private http: HttpClient) { }
  getAllContact(): Observable<contact[]> {
    return this.http.get<contact[]>(this.url + '/AllContactDetails');
  }

  getContactById(ContactId: string): Observable<contact> {
    return this.http.get<contact>(this.url + '/GetContactDetailsById/' + ContactId);
  }
  createContact(contact: contact): Observable<contact> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<contact>(this.url + '/InsertContactDetails/', contact, httpOptions);
  }

  updateContact(contact: contact): Observable<contact> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<contact>(this.url + '/UpdateContactDetails/', contact, httpOptions);
  }

  deleteContactById(contactid: string): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(this.url + '/DeleteContactDetails?id=' + contactid, httpOptions);
  }

}
