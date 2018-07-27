import { MentorResultsComponent } from './mentor-results/mentor-results.component';
import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NotLoggedInComponent } from './not-logged-in/not-logged-in.component';
import { MentorRequestsComponent } from './mentor-requests/mentor-requests.component';
import { AdministrationComponent } from './administration/administration.component';
import { MenteePromptsComponent } from './mentee-prompts/mentee-prompts.component';

import { LoginResolver } from './_resolvers/login-resolver';

export const appRoutes: Routes = [
    {path: 'home', component: HomeComponent, resolve: {login: LoginResolver} },
    {path: 'profile', component: UserProfileComponent, resolve: {login: LoginResolver}  },
    {path: 'administration', component: AdministrationComponent, resolve: {login: LoginResolver}  },
    {path: 'requests', component: MentorRequestsComponent, resolve: {login: LoginResolver} },
    {path: 'results', component: MentorResultsComponent, resolve: {login: LoginResolver} },
    {path: 'find', component: MenteePromptsComponent, resolve: {login: LoginResolver} },
    {path: 'notLoggedIn', component: NotLoggedInComponent },
    {path: '**', component: HomeComponent, resolve: {login: LoginResolver} },
];
