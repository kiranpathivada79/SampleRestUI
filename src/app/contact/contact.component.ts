import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ContactService } from '../contact.service';
import { contact } from '../contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  dataSaved = false;
  contactForm: any;
  allContact: Observable<contact[]>;
  employeeIdUpdate = null;
  massage = null;

  constructor(private formbulider: FormBuilder, private contactService: ContactService) { }

  ngOnInit() {
    this.contactForm = this.formbulider.group({
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      MiddleName: ['', [Validators.required]],
      Zip: ['', [Validators.required]],
      Street: ['', [Validators.required]],
      City: ['', [Validators.required]],
      State: ['', [Validators.required]],
      CratedDate: ['', [Validators.required]],
      ContactId:['']
    });
    this.loadAllContacts();
  }
  loadAllContacts() {
    this.allContact = this.contactService.getAllContact();
  }
  onFormSubmit() {
    this.dataSaved = false;
    const employee = this.contactForm.value;
    this.CreateEmployee(employee);
    this.contactForm.reset();
  }
  loadEmployeeToEdit(ContactId: string) {
    this.contactService.getContactById(ContactId).subscribe(employee => {
      this.massage = null;
      this.dataSaved = false;
      this.employeeIdUpdate =0;
      this.contactForm.controls['ContactId'].setValue(employee.ContactId);
      this.contactForm.controls['FirstName'].setValue(employee.FirstName);
      this.contactForm.controls['LastName'].setValue(employee.LastName);
      this.contactForm.controls['MiddleName'].setValue(employee.MiddleName);
      this.contactForm.controls['Zip'].setValue(employee.Zip);
      this.contactForm.controls['Street'].setValue(employee.Street);
      this.contactForm.controls['State'].setValue(employee.State);
      this.contactForm.controls['City'].setValue(employee.City);
      this.contactForm.controls['CratedDate'].setValue(employee.CratedDate);
    });

  }
  CreateEmployee(contact: contact) {
    if (contact.ContactId == 0) {
      this.contactService.createContact(contact).subscribe(
        () => {
          this.dataSaved = true;
          this.massage = 'Record saved Successfully';
          this.loadAllContacts();
          this.employeeIdUpdate = null;
          this.contactForm.reset();
        }
      );
    } else {
      contact.ContactId = contact.ContactId;
      this.contactService.updateContact(contact).subscribe(() => {
        this.dataSaved = true;
        this.massage = 'Record Updated Successfully';
        this.loadAllContacts();
        this.employeeIdUpdate = null;
        this.contactForm.reset();
      });
    }
  }
 
  deleteEmployee(employeeId: string) {
    if (confirm("Are you sure you want to delete this ?")) {  
    this.contactService.deleteContactById(employeeId).subscribe(() => {
      this.dataSaved = true;
      this.massage = 'Record Deleted Succefully';
      this.loadAllContacts();
      this.employeeIdUpdate = null;
      this.contactForm.reset();

    });
  }
}
  resetForm() {
    this.contactForm.reset();
    this.massage = null;
    this.dataSaved = false;
  }
}
