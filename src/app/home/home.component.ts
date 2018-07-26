import { Component, OnInit } from '@angular/core';

import { ApiService } from './../_services/api.service';

import { Utilities } from './../_helpers/Utilities';

import { Login } from './../_models/userDetails';
import { ActivatedRoute } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  login: Login;

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.login = data['login'];
    });
  }

}
