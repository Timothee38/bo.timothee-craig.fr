import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { AppState } from '../models/index';

import { Injectable } from '@angular/core';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { map, filter, scan, catchError } from 'rxjs/operators';


@Injectable()
export class DataService {

    private actionUrl: string;
    private headers: Headers;
    private options: RequestOptions;

    constructor(private http: Http, private appstate: AppState) {
        // this.addHeaders();
    }

    /* Initializes headers for CORS
      If the user is authenticated, adds the token to Authorization header
    */
    addHeaders() : void {
      this.headers = new Headers({ 'Content-Type': 'application/json' });
      this.headers.append('Accept', 'application/json');
      this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
      this.headers.append('Access-Control-Allow-Origin', '*');
      this.headers.append('Access-Control-Allow-Headers', "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding");
      this.headers.append('Access-Control-Expose-Headers', 'Authorization');
      // console.log("data service", this.appstate);
      if(this.appstate.isAuthentificated) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // console.log("IN THE Authorization THINGY", currentUser.token);
        this.headers.append("Authorization", currentUser.token);
      }
      this.options = new RequestOptions({ headers: this.headers });
    }

    /*
      Headers for file
    */
    addHeadersForFileUpload() : void {
      this.headers = new Headers();
      this.headers.append('enctype', 'multipart/form-data');
      this.headers.append('Accept', 'application/json');
      this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
      this.headers.append('Access-Control-Allow-Origin', '*');
      this.headers.append('Access-Control-Allow-Headers', "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding");
      this.headers.append('Access-Control-Expose-Headers', 'Authorization');
      // console.log("data service", this.appstate);
      if(this.appstate.isAuthentificated) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // console.log("IN THE Authorization THINGY", currentUser.token);
        this.headers.append("Authorization", currentUser.token);
      }
      this.options = new RequestOptions({ headers: this.headers });
    }

    /*
    Performs a get operation on the rest api
    param url: the url on which to perform the get
    returns: an observable of the item T
    */
    public getAll<T>(url: string): Observable<T[]> {
        this.addHeaders();
        return this.http.get(url, this.options).pipe(map(this.extractData),catchError(this.handleError));
    }

    public getAllBy<T>(url: string, by: string): Observable<T[]> {
      this.addHeaders();
      return this.http.get(url + "/" + by, this.options).pipe(map(this.extractData), catchError(this.handleError));
    }

    public getOne<T>(url: string): Observable<T> {
      this.addHeaders();
      return this.http.get(url, this.options).pipe(map(this.extractData),catchError(this.handleError));
    }

    /*
    Performs a get operation on the rest api
    param url: the url on which to perform the get
    param id: the identifier of the item T
    returns: an observable of the item T
    */
    public getSingle<T>(url: string, id: string): Observable<T> {
        this.addHeaders();
        return this.http.get(url + "/" + id, this.options).pipe(map(this.extractData),catchError(this.handleError));
    }

    /*
    Performs a post operation on the rest api
    param url: the url on which to perform the post
    param item: the item of type T to add to the database
    returns: an observable of the item T
    */
    public add<T>(url: string, item: T): Observable<T> {
        const toAdd = JSON.stringify(item);
        this.addHeaders();
        return this.http.post(url, toAdd, this.options).pipe(map(this.extractData),catchError(this.handleError));
    }

    /*
    File uploader
     */
    public uploadFile<T>(url: string, data: any): Observable<T> {
      this.addHeadersForFileUpload();
      return this.http.post(url, data, this.options).pipe(map(this.extractData), catchError(this.handleError));
    }

    /*
    Performs a post operation on the rest api
    param url: the url on which to perform the post
    param item: the item we want to add
    returns: true if the response from the server is 2XX
    */
    public addReturnsStatus<T>(url: string, item: T): Observable<boolean> {
      const toAdd = JSON.stringify(item);
      this.addHeaders();
      return this.http.post(url, toAdd, this.options)
        .pipe(map((res: Response) => {
          if((200<=res.status)&&(res.status<300)) {
            return true;
          }
          return false;
        })
        ,catchError(this.handleError));
    }

    /*
    Performs a put operation on the rest api
    param url: the url on which to perform the put
    param id: the identifier of the item to update
    param itemToUpdate: the item we want to add
    returns: true if the response from the server is 2XX
    */
    updateReturnsStatus<T>(url: string, id: string, itemToUpdate: T) : Observable<boolean> {
      const toAdd = JSON.stringify(itemToUpdate);
      this.addHeaders();
      return this.http.put(url + "/" + id, toAdd, this.options)
        .pipe(map(((res: Response) => {
          // console.log(res);
          if((200<=res.status)&&(res.status<300)) {
            return true;
          }
          return false;
        })),catchError(this.handleError));
    }

    /*
    Performs a put operation on the rest api
    param url: the url on which to perform the put
    param id: the identifier of the item to update
    param itemToUpdate: the item of type T to update in the database
    returns: an observable of the item T
    */
    public update<T>(url: string, id: any, itemToUpdate: T): Observable<T> {
        this.addHeaders();
        return this.http
            .put(url + "/" + id, JSON.stringify(itemToUpdate), this.options).pipe(map(this.extractData),catchError(this.handleError));
    }

    /*
    Performs a delete operation on the rest api
    param url: the url on which to perform the delete
    param id: the identifier of the item to delete
    returns: an observable of the item T
    */
    public delete<T>(url: string, id: number): Observable<T> {
        this.addHeaders();
        return this.http.delete(url + "/" + id, this.options).pipe(map(this.extractData),catchError(this.handleError));
    }

    /*
    Performs a delete operation on the rest api
    param url: the url on which to perform the delete
    param id: the identifier of the object to delete
    returns: true if deleted
    */
    public deleteReturnsStatus(url: string, id: string) : Observable<boolean> {
      this.addHeaders();
      return this.http.delete(url + "/" + id, this.options)
        .pipe(map((res: Response) => {
          // console.log(res);
          if((200<=res.status)&&(res.status<300)) {
            return true;
          }
          return false;
        }),catchError(this.handleError));
    }

    /*
    Function executed on a response
    param res: the response
    returns: the response in a JSON format
    */
    private extractData(res: Response) {
      let body = res.json();
      return body || { };
    }

    /*
    Function executed to handle errors
    param res: the caught error
    returns an Observable thrown error
    */
    private handleError (error: Response | any) {
      let errMsg: string;
      console.log(error.json());
      if (error instanceof Response) {
        const body = error.json() || '';
        errMsg = body.error;
      } else {
        errMsg = error.error ? error.error : error.toString();
      }
        return Observable.throw(errMsg);
      }


}
