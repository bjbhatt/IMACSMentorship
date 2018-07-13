import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, Observer } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { UserProfile, Mentor, Mentee } from './../_models/userDetails';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getUserProfile(): Observable<UserProfile> {
    return this.http.get(this.baseUrl + '/' + 'userprofile').pipe(
      map((response) => <UserProfile>response),
      catchError(this.handleError)
    );
  }

  getUserMentorInfo(): Observable<Mentor> {
    return this.http.get(this.baseUrl + '/' + 'mentor').pipe(
      map((response) => <Mentor>response),
      catchError(this.handleError)
    );
  }

  getUserMenteeInfo(): Observable<Mentee> {
    return this.http.get(this.baseUrl + '/' + 'mentee').pipe(
      map((response) => <Mentee>response),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    const applicationError = error.headers.get('Application-Error');
    if (applicationError) {
      return throwError(applicationError);
    }
    const serverError = error.json();
    let errors = '';
    if (serverError) {
      for (const key in serverError) {
        if (serverError[key]) {
          errors += serverError[key] + '\n';
        }
      }
    }

    return throwError(errors || 'Server Error');
  }
}
