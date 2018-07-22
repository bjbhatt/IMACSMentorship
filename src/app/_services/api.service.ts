import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  constructor(private http: HttpClient) {}

  isLoggedIn(): Observable<boolean> {
    return this.http
      .get(
        'https://connect3dev.niehs.nih.gov/imacs/rest/loginService.cfc?method=isLoggedIn'
      )
      .pipe(
        map((response: any) => {
          return response && response.loggedIn;
        }),
        catchError(this.handleError)
      );
  }
  isLoggedInMock(): Observable<boolean> {
    const isLoggedIn = true;
    return Observable.create((observer: Observer<boolean>) =>
      observer.next(isLoggedIn)
    );
  }

  getUserProfile(): Observable<UserProfile> {
    return this.http.get(this.baseUrl + '/' + 'userprofile').pipe(
      map(response => <UserProfile>response),
      catchError(this.handleError)
    );
  }
  getUserProfileMock(): Observable<UserProfile> {
    const userProfile: UserProfile = {
      id: 1,
      name: 'John Doe'
    };
    return Observable.create((observer: Observer<UserProfile>) =>
      observer.next(userProfile)
    );
  }

  getUserMentorInfo(): Observable<Mentor> {
    return this.http.get(this.baseUrl + '/' + 'mentor').pipe(
      map(response => <Mentor>response),
      catchError(this.handleError)
    );
  }
  getUserMentorInfoMock(): Observable<Mentor> {
    const mentor: Mentor = {
      id: 1,
      status: 'eligible',
      trainingDate: new Date('01/01/2014'),
      pendingRequests: [
        {
          id: '001',
          name: 'B J Bhatt',
          email: 'a@a.com',
          degree: 'Phd, MD',
          location: 'Hospital de Clinicas',
          expiresOn: new Date('07/27/2018')
        },
        {
          id: '002',
          name: 'Sagar Thakore',
          email: 'sagar@mentee.com',
          degree: 'MD, MBBS',
          location: 'Duke Medical Research',
          expiresOn: new Date('07/27/2018')
        },
        {
          id: '003',
          name: 'Jessica Reynolds',
          email: 'jessica@mentee.com',
          degree: 'MD, PA-C, MBBS',
          location: 'John Hopkins University School',
          expiresOn: new Date('07/27/2018')
        }
      ],
      mentee: {
        id: '002',
        name: 'Sagar Thakore',
        email: 'sagar@mentee.com',
        endsOn: new Date('07/27/2018')
      }
    };
    return Observable.create((observer: Observer<Mentor>) =>
      observer.next(mentor)
    );
  }

  getUserMenteeInfo(): Observable<Mentee> {
    return this.http.get(this.baseUrl + '/' + 'mentee').pipe(
      map(response => <Mentee>response),
      catchError(this.handleError)
    );
  }
  getUserMenteeInfoMock(): Observable<Mentee> {
    const mentee: Mentee = {
      id: 1,
      status: 'current',
      mentor: {
        name: 'John',
        email: 'x@x.com',
        expiresOn: new Date('07/27/2018'),
        endsOn: new Date('01/01/2020')
      }
    };
    return Observable.create((observer: Observer<Mentee>) =>
      observer.next(mentee)
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
