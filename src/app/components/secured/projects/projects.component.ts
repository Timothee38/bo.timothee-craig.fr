import { Component, OnInit, OnDestroy } from '@angular/core';

import { DataService, AlertService } from "../../../services/index";

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Project } from "../../../models/index";

import { Constants } from "../../../constants/app.constants";

@Component({
  selector: 'projects-component',
  templateUrl: '../../../templates/secured/projects/projects.component.html',
  providers: [NgbModalConfig, NgbModal]
})
export class ProjectsComponent implements OnInit, OnDestroy {

  projects: Project[];

  disableBtn: boolean = false;
  disableBtnEdit: boolean = false;

  model: Project = new Project();
  modelEdit: Project = new Project();

  constructor(private dataService: DataService, private alertService: AlertService, private constants: Constants, config: NgbModalConfig, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  ngOnDestroy(): void {

  }

  loadProjects(): void {
    this.dataService.getAll<Project>(this.constants.apiURL + "/projects")
      .subscribe(res => { this.projects = res; }, err => {this.alertService.error("Error loading projects");})
  }

  addProjects(): void {
    this.disableBtn = true;
    this.dataService.add<Project>(this.constants.apiURL + "/projects", this.model)
      .subscribe(
        res => {this.loadProjects(); this.model = new Project(); this.disableBtn = false; this.alertService.success("Added project.");}
      , err => {this.alertService.error("Error adding projects");});
  }

  delete(id: number): void {
    this.dataService.deleteReturnsStatus(this.constants.apiURL + "/projects", id)
      .subscribe(res => {
        if(res) {
          this.loadProjects();
          this.alertService.success("Project deletion success");
        } else {
          this.alertService.error("Project deletion error");
        }
      }, err=> {this.alertService.error("Project deletion error");});
  }

  showModal(content:any, contactToEdit: Project): void {
    this.modelEdit = contactToEdit;
    this.modalService.open(content);
  }

  edit(): void {
    this.disableBtnEdit = true;
    this.dataService.update<Project>(this.constants.apiURL + "/projects", this.modelEdit.id, this.modelEdit)
      .subscribe(res => { this.disableBtnEdit = false; this.loadProjects(); this.modalService.dismissAll(); this.alertService.success("Project edition success"); },
                 err => { this.disableBtnEdit = false; this.modalService.dismissAll(); this.alertService.error("Project edition error"); });

  }

}
