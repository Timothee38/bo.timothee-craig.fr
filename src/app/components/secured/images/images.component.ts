import { Component, OnInit, OnDestroy } from '@angular/core';

import { DataService, AlertService } from "../../../services/index";

import { Image } from "../../../models/index";

import { Constants } from "../../../constants/app.constants";

@Component({
  selector: 'images-component',
  templateUrl: '../../../templates/secured/images/images.component.html',
})
export class ImagesComponent implements OnInit, OnDestroy {
  images: Image[];

  constructor(private dataService: DataService, private alertService: AlertService, private constants: Constants) {}

  ngOnInit(): void {
    this.loadImages();
  }

  ngOnDestroy(): void {

  }

  loadImages(): void {
    this.dataService.getAll<Image>(this.constants.apiURL + "/all-images")
      .subscribe(res => { this.images = res; }, err => {this.alertService.error("Error loading images");})
  }
}
