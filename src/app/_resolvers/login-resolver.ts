import { Login } from '../_models/all-api-models';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ApiService } from '../_services/api.service';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginResolver implements Resolve<Login> {
    constructor(private apiService: ApiService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Login> {
        return this.apiService.loggedIn().pipe(
            catchError(error => {
                return of(null);
            })
        );
    }
}
