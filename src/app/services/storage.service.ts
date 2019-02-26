import { Contact } from '../models/contact';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storageSub = new Subject<{ key: 'value' }>();

  constructor(public snackBar: MatSnackBar) { }

  getAllContacts() { return JSON.parse(localStorage.getItem('contactList')); }

  generateId(): string { return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); }

  findContactIndexById(id: string, contact: Contact[]) { return contact.findIndex(item => item['id'] === id); }

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  setItem(key: string, data: any) {
    localStorage.setItem(key, data);
    this.storageSub.next({ key: data });
  }
}
