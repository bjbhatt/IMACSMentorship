import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NotLoggedInComponent } from './not-logged-in/not-logged-in.component';
import { MentorRequestsComponent } from './mentor-requests/mentor-requests.component';
import { AdministrationComponent } from './administration/administration.component';
import { MenteePromptsComponent } from './mentee-prompts/mentee-prompts.component';

export const appRoutes: Routes = [
    {path: 'home', component: HomeComponent },
    {path: 'profile', component: UserProfileComponent },
    {path: 'administration', component: AdministrationComponent },
    {path: 'requests', component: MentorRequestsComponent},
    {path: 'find', component: MenteePromptsComponent},
    {path: 'notLoggedIn', component: NotLoggedInComponent},
    {path: '**', component: HomeComponent },
];
