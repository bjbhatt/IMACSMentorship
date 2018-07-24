import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, Observer } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { UserProfile, Mentor, Mentee, Login } from './../_models/userDetails';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  isLoggedIn(): Observable<Login> {
    // return this.http.get<Login>(this.baseUrl + 'IsLoggedIn')
    //   .pipe(
    //     map((response) => {
    //       return response;
    //     }),
    //     catchError(this.handleError)
    //   );
    const login: Login = {
      userId: 1,
      fullName: 'John Doe',
    };
    return Observable.create((observer: Observer<Login>) =>
      observer.next(login)
    );
  }

  getUserProfile(userId: number): Observable<UserProfile> {
    //   return this.http.get<UserProfile>(this.baseUrl + 'GetUserProfile&userId=' + userId)
    //     .pipe(
    //       map(response => response),
    //       catchError(this.handleError)
    //     );
    const userProfile: UserProfile = {
      userId: userId,
      fullName: 'John Doe',
      emailAddress: 'jdoe@email.com',
    };
    return Observable.create((observer: Observer<UserProfile>) =>
      observer.next(userProfile)
    );
  }

  getUserMentorInfo(userId: number): Observable<Mentor> {
    // return this.http.get<Mentor>(this.baseUrl + '/' + 'GetMentorInfo&userId=' + userId)
    //   .pipe(
    //     map(response => response),
    //     catchError(this.handleError)
    //   );
    const mentor: Mentor = {
      userId: userId,
      status: 'Eligible',
      // trainingDate: new Date('01/01/2014'),
      pendingRequests: [
        {
          userId: 2,
          fullName: 'B J Bhatt',
          emailAddress: 'a@a.com',
          degree: 'Phd, MD',
          location: 'Hospital de Clinicas',
          requestDate: new Date('06/27/2018'),
          expirationDate: new Date('07/22/2018')
        },
        {
          userId: 3,
          fullName: 'Sagar Thakore',
          emailAddress: 'sagar@mentee.com',
          degree: 'MD, MBBS',
          location: 'Duke Medical Research',
          requestDate: new Date('06/27/2018'),
          expirationDate: new Date('07/27/2018')
        },
        {
          userId: 4,
          fullName: 'Jessica Reynolds',
          emailAddress: 'jessica@mentee.com',
          degree: 'MD, PA-C, MBBS',
          location: 'John Hopkins University School',
          requestDate: new Date('06/27/2018'),
          expirationDate: new Date('07/27/2018')
        }
      ],
      currentMentee: {
        userId: 2,
        fullName: 'Jessica Reynolds',
        emailAddress: 'jessica@mentee.com',
        startDate: new Date('06/27/2018'),
        endDate: new Date('06/26/2020')
      }
    };
    return Observable.create((observer: Observer<Mentor>) =>
      observer.next(mentor)
    );
  }

  getUserMenteeInfo(userId: number): Observable<Mentee> {
    // return this.http.get<Mentor>(this.baseUrl + '/' + 'GetMenteeInfo&userId=' + userId)
    //   .pipe(
    //     map(response => <Mentee>response),
    //     catchError(this.handleError)
    //   );
    const mentee: Mentee = {
      userId: 1,
      status: 'Current',
      pendingRequest: {
        userId: 2,
        fullName: 'B J Bhatt',
        emailAddress: 'a@a.com',
        degree: 'x',
        location: 'x',
        requestDate: new Date('06/27/2018'),
        expirationDate: new Date('07/27/2018')
      },
      currentMentor: {
        userId: 1,
        fullName: 'John',
        emailAddress: 'x@x.com',
        startDate: new Date('07/27/2018'),
        endDate: new Date('01/01/2020')
      }
    };
    return Observable.create((observer: Observer<Mentee>) =>
      observer.next(mentee)
    );
  }

  private handleError(httpError: any) {
    const applicationError = httpError.headers.get('Application-Error');
    let error = {};
    if (applicationError) {
      error = {
        type: 'application',
        content: JSON.parse(applicationError)
      };
    } else if (httpError.status === 403) {
      error = {
        type: 'system',
        message: 'You are either not logged in or you don\'t have perimssions to perform requested operation'
      };
    } else {
      error = {
        type: 'system',
        message: 'Internal Server Error while performing the requested operation'
      };
    }

    return throwError(error);
  }
}
