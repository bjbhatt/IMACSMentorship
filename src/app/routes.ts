import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NotLoggedInComponent } from './not-logged-in/not-logged-in.component';
import { MentorRequestsComponent } from './mentor-requests/mentor-requests.component';
import { AdministrationComponent } from './administration/administration.component';
import { MentorSearchComponent } from './mentor-search/mentor-search.component';

import { LoginResolver } from './_resolvers/login-resolver';

export const appRoutes: Routes = [
    {
        path: '',
        resolve: {login: LoginResolver},
        children: [
            {path: 'home', component: HomeComponent },
            {path: 'profile', component: UserProfileComponent },
            {path: 'administration', component: AdministrationComponent },
            {path: 'mentorRequests', component: MentorRequestsComponent },
            {path: 'mentorSearch', component: MentorSearchComponent },
            {path: 'notLoggedIn', component: NotLoggedInComponent },
            {path: '**', component: HomeComponent }
        ]
    }
];
