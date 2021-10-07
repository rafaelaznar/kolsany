import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { API_URL, environment, httpOptions } from 'src/environments/environment';


import { catchError, retry, shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }

  sURL = API_URL + '/session';

  onCheck = new EventEmitter<any>();

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
      if (environment) console.log("SessionService: error: " + errorMessage);
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (environment) console.log("SessionService: error: " + errorMessage);
    }    
    return throwError(errorMessage);
  }

  login(loginData: any): Observable<String> {
    if (environment) console.log("SessionService: login");
    return this.http.post(this.sURL, loginData, httpOptions).pipe(
      tap((u: any) => console.log("session.service login HTTP request executed", u)),
      retry(1),
      catchError(this.handleError));
  }

  logout(): Observable<any> {
    if (environment) console.log("SessionService: logout");
    return this.http.delete(this.sURL, httpOptions).pipe(
      retry(1),
      catchError(this.handleError));
  }

  check(): Observable<String> {
    if (environment) console.log("SessionService: check");
    return this.http.get<String>(this.sURL + '?op=check', httpOptions).pipe(
      tap((u: any) => console.log("session.service check HTTP request executed: ", u)),
      shareReplay(),
      catchError(this.handleError)
    )
  }

}
