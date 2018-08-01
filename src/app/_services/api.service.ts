import { MentorSearchOptions } from './../_models/mentorship-search-options';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, Observer, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { UserProfile, Mentor, Mentee, Login, MentorshipHistory, MentorSearch } from './../_models/all-api-models';
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

  getUserMenteeInfo(userId: number): Observable<Mentee> {
    if (this.useMock) {
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
      return of(mentee);
    } else {
      return this.get<Mentee>(this.baseUrl + '?method=MenteeInfo&userId=' + userId);
    }
  }

  sendMessage(subject: string, message: string, to?: string, cc?: string, bcc?: string) {
    if (this.useMock) {
      console.log(to, cc, bcc, subject, message);
    } else {
      const body = new HttpParams()
        .set('subject', subject)
        .set('message', message);
        if (to) {
          body.set('to', to);
        }
        if (cc) {
          body.set('cc', cc);
        }
        if (bcc) {
          body.set('bcc', bcc);
        }
      return this.postFormEncoded<void>(this.baseUrl + '?method=SendMessage', body);
    }
  }

  updateMentorTrainingDate(userId: number, trainingDate: string): Observable<Mentor> {
    if (this.useMock) {
      const mentor: Mentor = {
        userId: userId,
        status: 'Eligible',
        trainingDate: trainingDate,
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
      const body = new HttpParams()
        .set('userId', userId.toString())
        .set('trainingDate', trainingDate.toString());
      return this.postFormEncoded<Mentor>(this.baseUrl + '?method=MentorTrainingDate', body);
    }
  }

  updateMentorAvailibility(userId: number, available: boolean): Observable<Mentor> {
    if (this.useMock) {
      const mentor: Mentor = {
        userId: userId,
        status: available ? 'Current' : 'Eligible',
        trainingDate: '7/1/2018',
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
      const body = new HttpParams()
        .set('userId', userId.toString())
        .set('available', available.toString());
      return this.postFormEncoded<Mentor>(this.baseUrl + '?method=MentorAvailibility', body);
    }
  }

  addMentorRequest(userId: number, mentorUserId: number, subject: string, message: string): Observable<Mentee> {
    if (this.useMock) {
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
      return of(mentee);
    } else {
      const body = new HttpParams()
        .set('userId', userId.toString())
        .set('mentorUserId', mentorUserId.toString())
        .set('subject', subject)
        .set('message', message);
      return this.postFormEncoded<Mentee>(this.baseUrl + '?method=MentorRequest', body);
    }
  }

  acceptMentorship(userId: number, menteeUserId: number): Observable<Mentor> {
    if (this.useMock) {
      const mentor: Mentor = {
        userId: userId,
        status: 'Current',
        trainingDate: '7/1/2018',
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
      const body = new HttpParams()
        .set('userId', userId.toString())
        .set('menteeUserId', menteeUserId.toString());
      return this.postFormEncoded<Mentor>(this.baseUrl + '?method=AcceptMentorship', body);
    }
  }

  cancelMentorRequest(userId: number, mentorUserId: number): Observable<Mentee> {
    if (this.useMock) {
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
      return of(mentee);
    } else {
      const body = new HttpParams()
        .set('userId', userId.toString())
        .set('mentorUserId', mentorUserId.toString());
      return this.postFormEncoded<Mentee>(this.baseUrl + '?method=CancelRequest', body);
    }
  }

  declineMentorRequest(userId: number, menteeUserId: number): Observable<Mentor> {
    if (this.useMock) {
      const mentor: Mentor = {
        userId: userId,
        status: 'Current',
        trainingDate: '7/1/2018',
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
      const body = new HttpParams()
        .set('userId', userId.toString())
        .set('menteeUserId', menteeUserId.toString());
      return this.postFormEncoded<Mentor>(this.baseUrl + '?method=DeclineRequest', body);
    }
  }

  searchMentors(userId: number, searchParams: MentorSearchOptions): Observable<MentorSearch[]> {
    // if (this.useMock) {
      const mentorSearch: MentorSearch[] = [
        {
          userId: 1,
          fullName: 'John Doe',
          emailAddress: 'john@x.com',
          degree: 'Degree X1',
          location: 'Location Y1',
          available: true
        },
        {
          userId: 2,
          fullName: 'John Doe',
          emailAddress: 'john@x.com',
          degree: 'Degree X1',
          location: 'Location Y1',
          available: false,
          availableAfter: new Date('01/01/2019')
        }
      ];
      return of(mentorSearch);
    // } else {
    //   const body = new HttpParams()
    //     .set('clinicalCare',
    //       searchParams.clinicalCare ?
    //       searchParams.clinicalCare :
    //       'n/a')
    //     .set('focus',
    //       searchParams.focus ?
    //       searchParams.focus :
    //       'n/a')
    //     .set('specialization',
    //       searchParams.specialization && searchParams.specialization.length > 0 ?
    //       searchParams.specialization.join(',') :
    //       'n/a')
    //     .set('expertise',
    //       searchParams.expertise && searchParams.expertise.length > 0 ?
    //       searchParams.expertise.join(',') :
    //       'n/a')
    //     .set('location',
    //       searchParams.location && searchParams.location.length > 0 ?
    //       searchParams.location.join(',') :
    //       'n/a');
    //   return this.postFormEncoded<MentorSearch[]>(this.baseUrl + '?method=SearchMentors', body);
    // }
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
