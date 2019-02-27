import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ContactService } from '../services/contact.service';
import { StorageService } from '../services/storage.service';
import { Contact } from '../models/contact';


@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

    contactForm: FormGroup;
    isEditMode: boolean;
    formtitle = 'Add Contact Form';

    get fields() { return this.contactForm.controls; }

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<ContactFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Contact,
        private cservice: ContactService,
        public storageServ: StorageService) { }

    ngOnInit() {
        this.contactForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
            lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
            email: ['', [Validators.required, Validators.email]],
            phoneNumber: ['', [Validators.required, Validators.minLength]],
            status: ['', Validators.required],
            id: ['']
        });

        if (this.data) {
            this.fillForm(this.data);
            this.isEditMode = true;
            this.formtitle = 'Update Contact Form';
        }
    }

    onSubmit(contactFormData: Contact) {

        if (this.isEditMode) {
            this.cservice.edit(contactFormData);
        } else {
            this.cservice.add(contactFormData);
        }
        this.dialogRef.close();
    }

    private fillForm(data: Contact) {
        this.contactForm.controls.firstName.setValue(data.firstName);
        this.contactForm.controls.lastName.setValue(data.lastName);
        this.contactForm.controls.email.setValue(data.email);
        this.contactForm.controls.phoneNumber.setValue(data.phoneNumber);
        this.contactForm.controls.status.setValue(data.status);
        this.contactForm.controls.id.setValue(data.id);
    }


}
