import { Component, OnInit } from '@angular/core';

import { Utilities } from '../_helpers/Utilities';

import { Login } from '../_models/apiModels';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  login: Login;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.login = data['login'];
    });
  }

}
