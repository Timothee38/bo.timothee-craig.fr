import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';

import { Constants } from "../constants/app.constants";

import { AppState } from "../models/index";

@Injectable()
export class AuthenticationService {

 token: string;
 headers: Headers;
 options: RequestOptions;

  /*
  retrieves information on authToken and userId
  */
  constructor(private http: Http, public appstate: AppState, private constants: Constants) {
    appstate.isAuthentificated = false;
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser) {
    this.token = currentUser.token;
      if(this.token) {
        appstate.isAuthentificated = true;
      }
    }
  }

  /*
  Sends a request to the user service with PUT on /api/authorise, with email and password as a json body
  returns true if the token is retrieved in the response from the server and sets a local json token
  returns false otherwise
  */
  login(username: string, password: string): Observable<boolean> {
    this.addHeaders();
    return this.http.post(this.constants.userServiceAPIUrl + '/login', JSON.stringify({ username: username, password: password }), this.options)
      .pipe(map((res: Response) => {
        let token = res.headers.get("Authorization").replace("Bearer ", "");
        if(token) {
          this.token = token;
          localStorage.setItem('currentUser', JSON.stringify({ token: token }));
          this.appstate.isAuthentificated = true;
          return true;
        }
        else {
          return false;
        }
      }));
  }

  addHeaders() : void {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Accept', 'application/json');
    this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append('Access-Control-Allow-Headers', "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding");
    this.headers.append('Access-Control-Expose-Headers', 'Authorization');
    if(this.appstate.isAuthentificated) {
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      // console.log("DATA SERVICE : ", currentUser.token);
      this.headers.append("Authorization", currentUser.token);
    }
    this.options = new RequestOptions({ headers: this.headers });
  }

  /*
  Removes local user information and updates the app state
  */
  logout(): void {
    this.addHeaders();
    this.token = null;
    this.appstate.isAuthentificated = false;
    localStorage.removeItem('currentUser');
  }

}
