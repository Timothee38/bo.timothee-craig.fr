import { Component, OnInit, OnDestroy } from '@angular/core';

import { DataService, AlertService } from "../../../services/index";

import { Project } from "../../../models/index";

import { Constants } from "../../../constants/app.constants";

@Component({
  selector: 'projects-component',
  templateUrl: '../../../templates/secured/projects/projects.component.html',
})
export class ProjectsComponent implements OnInit, OnDestroy {

  projects: Project[];

  disableBtn: boolean = false;

  model: Project = new Project();

  constructor(private dataService: DataService, private alertService: AlertService, private constants: Constants) {}

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

}
