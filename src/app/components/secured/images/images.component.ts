import { Component, OnInit, OnDestroy } from '@angular/core';

import { DataService, AlertService } from "../../../services/index";

import { Image } from "../../../models/index";

import { Constants } from "../../../constants/app.constants";

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'images-component',
  templateUrl: '../../../templates/secured/images/images.component.html',
  providers: [NgbModalConfig, NgbModal]
})
export class ImagesComponent implements OnInit, OnDestroy {
  images: Image[];
  imagePath: string = "http://localhost:3000/img/";

  myFile: any = {};

  path: string = "";

  constructor(private dataService: DataService, private alertService: AlertService, private constants: Constants, config: NgbModalConfig, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadImages();
  }

  ngOnDestroy(): void {

  }

  loadImages(): void {
    this.dataService.getAll<Image>(this.constants.apiURL + "/all-images")
      .subscribe(res => { this.images = res; }, err => {this.alertService.error("Error loading images");})
  }

  delete(id: number): void {
    console.log(id);
  }

  showModal(content:any, path: string): void {
    this.path = this.imagePath + path;
    this.modalService.open(content);
  }

  closeModal(): void {

  }

  upload(): void {
    console.log(this.myFile);
  }

}
