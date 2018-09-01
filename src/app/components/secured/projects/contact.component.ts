import { Component, OnInit, OnDestroy } from '@angular/core';

import { DataService, AlertService } from "../../../services/index";

import { Contact } from "../../../models/index";

import { Constants } from "../../../constants/app.constants";

@Component({
  selector: 'contact-component',
  templateUrl: '../../../templates/secured/projects/contact.component.html',
})
export class ContactComponent implements OnInit, OnDestroy {

  contacts: Contact[];

  disableBtn: boolean = false;

  model: Contact = new Contact();

  constructor(private dataService: DataService, private alertService: AlertService, private constants: Constants) {}

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
      , err => {this.alertService.error("Error loading contacts");});
  }

}
