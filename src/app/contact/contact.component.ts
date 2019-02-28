import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { Contact } from '../models/contact';
import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit {

  contactList: Array<Contact> = [];

  contactListToCheck: any[];

  constructor(public dialog: MatDialog, public storageServ: StorageService) { }

  ngOnInit() {
    this.contactListToCheck = this.contactList = this.storageServ.getAllContacts();
    this.storageServ.watchStorage().subscribe((data: string) => {
      this.contactList = JSON.parse(localStorage.getItem('contactList'));
      this.contactListToCheck = Array.from(this.contactList);
    });
  }

  openFormDialog(formData = ''): void {
    this.dialog.open(ContactFormComponent, {
      width: '600px',
      data: formData,
      panelClass: 'c-form-dialog',
      backdropClass: 'c-form-backdrop'
    });
  }
}
