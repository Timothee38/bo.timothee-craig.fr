import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: '../templates/login.component.html',
  styleUrls: ['../../assets/css/login.css']
})
export class LoginComponent {
  
    constructor() {
        document.body.style.height = "100%";
        document.body.style.background  = "#D9D6CA url('../assets/img/background.jpg') no-repeat center center fixed";
        document.body.style.backgroundSize = "cover";
    }

    ngOnDestroy() {
        document.body.style.background = "none";
        document.body.style.backgroundSize = "none";
    }

}
