import { Injectable } from '@angular/core';
import { Observable, throwError, Observer } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { UserProfile, Mentor, Mentee } from './../_models/userDetails';

@Injectable({
  providedIn: 'root'
})
export class ApiMockService {

  constructor() { }

  isLoggedIn(): Observable<boolean> {
    const isLoggedIn = true;
    return Observable.create((observer: Observer<boolean>) => observer.next(isLoggedIn));
  }

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
