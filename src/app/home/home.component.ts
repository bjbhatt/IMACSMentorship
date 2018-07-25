import { Component, OnInit } from '@angular/core';

import { ApiService } from './../_services/api.service';

import { Utilities } from './../_helpers/Utilities';

import { Login } from './../_models/userDetails';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  login: Login;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loadModel();
  }

  loadModel() {
    this.apiService.isLoggedIn().subscribe((login: Login) => {
      this.login = login;
    });
  }

}
