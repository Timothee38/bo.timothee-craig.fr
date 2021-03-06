import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ChartsModule } from 'ng2-charts';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';

import { AppComponent } from '../components/app.component';

import { AlertComponent,
  LoginComponent,
  SecuredComponent,
  ChartsComponent,
  ProjectsComponent,
  ImagesComponent,
  NotFoundComponent,
  ProjectsContactComponent,
  ContactComponent,
  UnauthorizedComponent } from '../components/index';

import { AuthGuard } from '../guards/auth.guard';

import { AuthenticationService, DataService } from "../services/index";

import { AlertService } from '../services/index';

import { AppState } from "../models/index";

import { Constants } from "../constants/app.constants";

/*
Declares the routes for our application
- path: the route (i.e. if path: 'home' => http://localhost.../home)
- component: the component to load for the given path
- canActivate: calls the method on the AuthGuard to check if the user can access this route

'**' => refers to pages not defined here
unauthorized => called by the AuthGuard if the user is not allowed to access a route
*/
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'secured', component: SecuredComponent, canActivate: [AuthGuard], children: [
    {
      path: 'charts', component: ChartsComponent
    },
    {
      path: 'projects', component: ProjectsContactComponent
    },
    {
      path: 'images', component: ImagesComponent
    },
    { path:'', redirectTo: 'charts', pathMatch: 'full'}
  ]},
  /*{ path: 'sign-in', component: LoginComponent },
  { path: 'profile/:userId', component: ProfileComponent, canActivate: [AuthGuard] }, // to change to /settings/:id
  { path: 'help', component: HelpComponent},
  { path: 'settings/:userId', component: SettingsComponent, canActivate: [AuthGuard] }, // to change to /settings/:id
  { path: 'register', component: RegisterComponent },
  // { path: 'mypwd', component: MyPasswordsComponent },*/
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SecuredComponent,
    ChartsComponent,
    ProjectsContactComponent,
    ContactComponent,
    ProjectsComponent,
    ImagesComponent, NotFoundComponent, UnauthorizedComponent,
    AlertComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    NgbModule.forRoot()
  ],
  providers: [AuthGuard,
    AuthenticationService,
    AlertService,
    AppState,
    DataService,
    Constants],
  bootstrap: [AppComponent]
})
export class AppModule { }
