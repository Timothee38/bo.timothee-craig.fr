import { Component, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService, AlertService } from '../services/index';

@Component({
    selector: 'login',
    templateUrl: '../templates/login.component.html',
    styleUrls: ['../../assets/css/login.css']
})

export class LoginComponent implements OnInit, OnDestroy {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService, private alertService: AlertService) {
          document.body.style.height = "100%";
          document.body.style.background  = "#D9D6CA url('../assets/img/background.jpg') no-repeat center center fixed";
          document.body.style.backgroundSize = "cover";
        }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate(['/secured/charts']);
                },
                error => {
                  console.log("error", error);
                  this.alertService.error("An error occured while trying to log in.")
                    this.loading = false;
                });
    }

    ngOnDestroy() {
        document.body.style.background = "none";
        document.body.style.backgroundSize = "none";
    }

}
