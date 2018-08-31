import { Component, OnInit, OnDestroy } from '@angular/core';

import { DataService, AlertService } from "../../../services/index";

import { Project } from "../../../models/index";

import { Constants } from "../../../constants/app.constants";

@Component({
  selector: 'projects-component',
  templateUrl: '../../../templates/secured/projects/projects.component.html',
})
export class ProjectsComponent {

  projects: Project[];

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

}
