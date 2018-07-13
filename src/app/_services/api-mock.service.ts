import { Injectable } from '@angular/core';
import { Observable, throwError, Observer } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { UserProfile, Mentor, Mentee } from './../_models/userDetails';

@Injectable({
  providedIn: 'root'
})
export class ApiMockService {

  constructor() { }

  getUserProfile(): Observable<UserProfile> {
    const userProfile: UserProfile = {
      id: 1,
      name: 'John Doe'
    };
    return Observable.create((observer: Observer<UserProfile>) => observer.next(userProfile));
  }

  getUserMentorInfo(): Observable<Mentor> {
    const mentor: Mentor = {
      id: 1,
      status: 'ineligible',
      trainingDate: new Date('01/01/2014'),
      // pendingRequests: [
      //   {
      //     name: 'B J Bhatt',
      //     email: 'a@a.com',
      //     expiresOn: new Date('07/27/2018')
      //   }
      // ],
      mentee: {
        name: 'John',
        email: 'x@x.com',
        endsOn: new Date('01/01/2020')
      }
    };
    return Observable.create((observer: Observer<Mentor>) => observer.next(mentor));
  }

  getUserMenteeInfo(): Observable<Mentee> {
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
    return Observable.create((observer: Observer<Mentee>) => observer.next(mentee));
  }
}
