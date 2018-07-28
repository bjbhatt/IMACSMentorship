import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule, BsDropdownModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { MentorPaneComponent } from './home/mentor-pane/mentor-pane.component';
import { MenteePaneComponent } from './home/mentee-pane/mentee-pane.component';
import { ApiService } from './_services/api.service';
import { LoginResolver } from './_resolvers/login-resolver';

import { AlertifyService } from './_services/alertify.service';
import { appRoutes } from './routes';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NotLoggedInComponent } from './not-logged-in/not-logged-in.component';
import { MentorRequestsComponent } from './mentor-requests/mentor-requests.component';
// import { MenteePromptsComponent } from './mentee-prompts/mentee-prompts.component';
// import { MentorResultsComponent } from './mentor-results/mentor-results.component';
import { MentorSearchComponent } from './mentor-search/mentor-search.component';
import { MentorSearchResultComponent } from './mentor-search/mentor-search-result/mentor-search-result.component';
import { AdministrationComponent } from './administration/administration.component';

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      MentorPaneComponent,
      MenteePaneComponent,
      UserProfileComponent,
      NotLoggedInComponent,
      MentorRequestsComponent,
    //   MenteePromptsComponent,
    //   MentorResultsComponent,
      MentorSearchComponent,
      MentorSearchResultComponent,
      AdministrationComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule,
      RouterModule.forRoot(appRoutes),
      BsDatepickerModule.forRoot(),
      BsDropdownModule.forRoot()
   ],
   providers: [
    AlertifyService,
    ApiService,
    LoginResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
