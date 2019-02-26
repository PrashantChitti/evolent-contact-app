import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { StorageService } from './storage.service';


@Injectable({
    providedIn: 'root'
})
export class ContactService {

    contactData: Array<Contact>;

    constructor(public storageServ: StorageService) {
        this.contactData = this.storageServ.getAllContacts();
        this.storageServ.watchStorage().subscribe((data: string) => {
            this.contactData = JSON.parse(localStorage.getItem('contactList'));
        });
    }

    add(contact: Contact) {
        contact.id = this.storageServ.generateId();
        if (!this.contactData) this.contactData = [];

        this.contactData.push(contact);
        this.storeInDB(this.contactData);
    }

    edit(contact: Contact) {
        const index = this.storageServ.findContactIndexById(contact.id, this.contactData);
        this.contactData[index] = contact;
        this.storeInDB(this.contactData);
    }

    delete(id: string) {
        const index = this.storageServ.findContactIndexById(id, this.contactData);
        this.contactData.splice(index, 1);
        this.storeInDB(this.contactData);
    }

    private storeInDB(data: Contact[]) {
        this.storageServ.setItem('contactList', JSON.stringify(data));
    }
}
