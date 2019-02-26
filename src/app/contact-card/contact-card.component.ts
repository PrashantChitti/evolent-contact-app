import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { ContactService } from '../services/contact.service';
import { StorageService } from './../services/storage.service';

@Component({
    selector: 'app-contact-card',
    templateUrl: './contact-card.component.html',
    styleUrls: ['./contact-card.component.css']
})
export class ContactCardComponent {

    @Input('card-data') cardData: any;

    constructor(public dialog: MatDialog, private cservice: ContactService, private storageServ: StorageService) { }

    openFormDialog(formData = ''): void {
        this.dialog.open(ContactFormComponent, {
            width: '600px',
            data: formData
        });
    }

    deleteContact(id: string) {
        this.cservice.delete(id);
    }


}
