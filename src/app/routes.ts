import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NotLoggedInComponent } from './not-logged-in/not-logged-in.component';

export const appRoutes: Routes = [
    {path: 'home', component: HomeComponent },
    {path: 'profile', component: UserProfileComponent },
    {path: 'notLoggedIn', component: NotLoggedInComponent},
    {path: '**', component: HomeComponent }
];
