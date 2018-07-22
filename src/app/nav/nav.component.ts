import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from './../_services/api.service';
import { AlertifyService } from './../_services/alertify.service';

import { UserProfile, Login } from './../_models/userDetails';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isLoggedIn: boolean;
  fullName = '';

  constructor(private apiService: ApiService,
    private alertifyService: AlertifyService,
    private router: Router) { }

  ngOnInit() {
    this.loadModel();
  }

  loadModel() {
    this.apiService.isLoggedInMock().subscribe((login: Login) => {
      this.isLoggedIn = true;
      this.fullName = login.fullName;
    });
  }
}
