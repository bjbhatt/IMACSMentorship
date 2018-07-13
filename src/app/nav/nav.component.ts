import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from './../_services/api.service';
import { ApiMockService } from './../_services/api-mock.service';
import { AlertifyService } from './../_services/alertify.service';

import { UserProfile } from './../_models/userDetails';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: UserProfile;

  constructor(private apiService: ApiMockService, private alertifyService: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.loadModel();
  }

  loadModel() {
    this.apiService.getUserProfile().subscribe((userProfile: UserProfile) => {
      if (userProfile) {
        this.model = userProfile;
      } else {
        this.router.navigate(['/notLoggedIn']);
      }
    }, error => {
      this.alertifyService.error(error);
    });
  }
}
