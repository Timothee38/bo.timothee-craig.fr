import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { AuthenticationService } from "../../services/index";

@Component({
  selector: 'secured-component',
  templateUrl: '../../templates/secured/secured.component.html',
})
export class SecuredComponent {

  constructor(private authService: AuthenticationService, private router: Router) {}

  signOut(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
