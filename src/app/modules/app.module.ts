import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from '../components/app.component';

import { LoginComponent, SecuredComponent } from '../components/index';

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
  { path: 'secured', component: SecuredComponent },
  /*{ path: 'sign-in', component: LoginComponent },
  { path: 'profile/:userId', component: ProfileComponent, canActivate: [AuthGuard] }, // to change to /settings/:id
  { path: 'help', component: HelpComponent},
  { path: 'settings/:userId', component: SettingsComponent, canActivate: [AuthGuard] }, // to change to /settings/:id
  { path: 'register', component: RegisterComponent },
  // { path: 'mypwd', component: MyPasswordsComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },*/
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },/*
  { path: '**', component: NotFoundComponent }*/
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SecuredComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
