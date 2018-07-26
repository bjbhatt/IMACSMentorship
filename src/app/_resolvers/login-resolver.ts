import { Login } from '../_models/userDetails';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AlertifyService } from '../_services/alertify.service';
import { ApiService } from '../_services/api.service';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { type } from 'os';

@Injectable()
export class LoginResolver implements Resolve<Login> {
    constructor(private apiService: ApiService, private router: Router, private alertifyService: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Login> {
        return this.apiService.loggedIn().pipe(
            catchError(error => {
                this.alertifyService.error('Problem retrieving data');
                if (route.routeConfig.component.name !== 'HomeComponent') {
                    this.router.navigate(['/']);
                }
                return of(null);
            })
        );
    }
}
