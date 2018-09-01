import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

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
  @ViewChild('myInput')
  myInputVariable: ElementRef;

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
    this.dataService.deleteReturnsStatus(this.constants.apiURL + "/images", id)
      .subscribe(res => {
        if(res) {
          this.loadImages();
          this.alertService.success("Image deletion success");
        } else {
          this.alertService.error("Image deletion error");
        }
      }, err=> {this.alertService.error("Image deletion error");});
  }

  showModal(content:any, path: string): void {
    this.path = this.imagePath + path;
    this.modalService.open(content);
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append('file', file);
        this.dataService.uploadFile<Image>(this.constants.apiURL + "/images", formData)
          .subscribe(res => {
            this.alertService.success('File uploaded.');
            this.myInputVariable.nativeElement.value = "";
            this.loadImages();
          });
    }
  }


}
