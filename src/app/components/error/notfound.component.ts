import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'notfound-component',
  templateUrl: '../../templates/errors/notfound.component.html',
  styleUrls: ['../../../assets/css/errors.css']
})
export class NotFoundComponent {
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
