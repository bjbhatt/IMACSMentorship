import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, Observer, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { UserProfile, Mentor, Mentee, Login, MentorshipHistory } from './../_models/all-api-models';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.baseUrl;
  private useMock = !environment.production;

  constructor(private http: HttpClient) { }

  private get<T>(url: string): Observable<T> {
    return this.http
    .get<T>(
      url)
    .pipe(
      map((response: T) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  private postFormEncoded<T>(url: string, body: HttpParams): Observable<T> {
    return this.http
    .post<T>(
      url,
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      })
    .pipe(
      map((response: T) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  private postJson<T>(url: string, body: any): Observable<T> {
    return this.http
    .post<T>(
      url,
      body)
    .pipe(
      map((response: T) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  loggedIn(): Observable<Login> {
    if (this.useMock) {
      const login: Login = {
        userId: 1,
        fullName: 'Mock John Doe',
        isAdmin: true
      };
      // const login: Login = null;
      return of(login);
    } else {
      return this.get<Login>(this.baseUrl + '?method=LoggedIn');
    }
  }

  getUserMentorInfo(userId: number): Observable<Mentor> {
    if (this.useMock) {
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
            expirationDate: new Date('07/31/2018')
          },
          {
            userId: 3,
            fullName: 'Sagar Thakore',
            emailAddress: 'sagar@mentee.com',
            degree: 'MD, MBBS',
            location: 'Duke Medical Research',
            requestDate: new Date('06/27/2018'),
            expirationDate: new Date('07/31/2018')
          },
          {
            userId: 4,
            fullName: 'Jessica Reynolds',
            emailAddress: 'jessica@mentee.com',
            degree: 'MD, PA-C, MBBS',
            location: 'John Hopkins University School',
            requestDate: new Date('06/27/2018'),
            expirationDate: new Date('07/31/2018')
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
      return of(mentor);
    } else {
      return this.get<Mentor>(this.baseUrl + '?method=MentorInfo&userId=' + userId);
    }
  }

  getPastMentees(userId: number): Observable<MentorshipHistory[]> {
    if (this.useMock) {
      const mentorshipHistoryItems: MentorshipHistory[] = [
        {
          userId: 2,
          fullName: 'John Doe',
          degree: 'Phd, MD',
          location: 'Hospital de Clinicas',
          outcome: 'CancelledByMentor',
          startDate: new Date('06/27/2018'),
          cancellationDate: new Date('07/22/2018')
        },
        {
          userId: 3,
          fullName: 'Mary Doe',
          degree: 'Phd, MD',
          location: 'Hospital de Clinicas',
          outcome: 'CancelledByMentee',
          startDate: new Date('06/27/2018'),
          cancellationDate: new Date('07/21/2018')
        },
        {
          userId: 4,
          fullName: 'David Doe',
          degree: 'Phd, MD',
          location: 'Hospital de Clinicas',
          outcome: 'Ended',
          startDate: new Date('07/22/2016'),
          endDate: new Date('07/21/2018')
        }
      ];
      return of(mentorshipHistoryItems);
    } else {
      return this.get<MentorshipHistory[]>(this.baseUrl + '?method=PastMentees&userId=' + userId);
    }
  }

  updateMentorTrainingDate(userId: number, trainingDate: string): Observable<void> {
    if (this.useMock) {
      return of();
    } else {
      const body = new HttpParams()
        .set('userId', userId.toString())
        .set('trainingDate', trainingDate.toString());
      return this.postFormEncoded<void>(this.baseUrl + '?method=MentorTrainingDate', body);
    }
  }

  updateMentorAvailibility(userId: number, available: boolean): Observable<void> {
    if (this.useMock) {
      return of();
    } else {
      const body = new HttpParams()
        .set('userId', userId.toString())
        .set('available', available.toString());
      return this.postFormEncoded<void>(this.baseUrl + '?method=MentorAvailibility', body);
    }
  }

  getUserMenteeInfo(userId: number): Observable<Mentee> {
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
    // return this.http.get<Mentor>(this.baseUrl + '/' + 'GetMenteeInfo&userId=' + userId)
    //   .pipe(
    //     map(response => <Mentee>response),
    //     catchError(this.handleError)
    //   );
  }

  getUserProfile(userId: number): Observable<UserProfile> {
    const userProfile: UserProfile = {
      userId: userId,
      fullName: 'John Doe',
      emailAddress: 'jdoe@email.com',
      isAdmin: false
    };
    return of(userProfile);
    //   return this.http.get<UserProfile>(this.baseUrl + 'GetUserProfile&userId=' + userId)
    //     .pipe(
    //       map(response => response),
    //       catchError(this.handleError)
    //     );
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
        message:
          'You are either not logged in or you don\'t have perimssions to perform requested operation'
      };
    } else {
      error = {
        type: 'system',
        message:
          'Internal Server Error while performing the requested operation'
      };
    }

    return throwError(error);
  }
}
