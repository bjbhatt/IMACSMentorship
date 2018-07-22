import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from './../_services/api.service';
import { AlertifyService } from './../_services/alertify.service';

import { UserProfile } from './../_models/userDetails';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: UserProfile;
  isLoggedIn: boolean;

  constructor(private apiService: ApiService,
    private alertifyService: AlertifyService,
    private router: Router) { }

  ngOnInit() {
    this.loadModel();
  }

  loadModel() {
    this.apiService.isLoggedInMock().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
      if (this.isLoggedIn) {
        this.apiService.getUserProfileMock().subscribe((userProfile: UserProfile) => {
          if (userProfile) {
            this.model = userProfile;
          }
        }, error => {
          this.alertifyService.error(error);
        });
      }
    });
  }
}
