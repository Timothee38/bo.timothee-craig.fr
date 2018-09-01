import { Component, OnInit, OnDestroy } from '@angular/core';

import { DataService, AlertService } from "../../../services/index";

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Contact } from "../../../models/index";

import { Constants } from "../../../constants/app.constants";

@Component({
  selector: 'contact-component',
  templateUrl: '../../../templates/secured/projects/contact.component.html',
  providers: [NgbModalConfig, NgbModal]
})
export class ContactComponent implements OnInit, OnDestroy {

  contacts: Contact[];

  disableBtn: boolean = false;
  disableBtnEdit: boolean = false;

  model: Contact = new Contact();
  modelEdit: Contact = new Contact();

  constructor(private dataService: DataService, private alertService: AlertService, private constants: Constants, config: NgbModalConfig, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  ngOnDestroy(): void {

  }

  loadContacts(): void {
    this.dataService.getAll<Contact>(this.constants.apiURL + "/contact")
      .subscribe(res => { this.contacts = res; }, err => {this.alertService.error("Error loading contacts");});
  }

  addContact(): void {
    this.disableBtn = true;
    this.dataService.add<Contact>(this.constants.apiURL + "/contact", this.model)
      .subscribe(
        res => {this.loadContacts(); this.model = new Contact(); this.disableBtn = false; this.alertService.success("Added contact.");}
      , err => {this.alertService.error("Error adding contacts");});
  }

  delete(id: number): void {
    this.dataService.deleteReturnsStatus(this.constants.apiURL + "/contact", id)
      .subscribe(res => {
        if(res) {
          this.loadContacts();
          this.alertService.success("Contact deletion success");
        } else {
          this.alertService.error("Contact deletion error");
        }
      }, err=> {this.alertService.error("Contact deletion error");});
  }

  showModal(content:any, contactToEdit: Contact): void {
    this.modelEdit = contactToEdit;
    this.modalService.open(content);
  }

  edit(): void {
    this.disableBtnEdit = true;
    this.dataService.update<Contact>(this.constants.apiURL + "/contact", this.modelEdit.id, this.modelEdit)
      .subscribe(res => { this.disableBtnEdit = false; this.loadContacts(); this.modalService.dismissAll(); this.alertService.success("Contact edition success"); },
                 err => { this.disableBtnEdit = false; this.modalService.dismissAll(); this.alertService.error("Contact edition error"); });

  }

}
