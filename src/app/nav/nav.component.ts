import { Component, OnInit } from '@angular/core';

import { ApiService } from '../_services/api.service';

import { Login } from '../_models/all-api-models';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  login: Login;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.loggedIn().subscribe((login: Login) => {
      this.login = login;
    });
  }
}
