import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Login } from '../_models/apiModels';


@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {
  login: Login;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.login = data['login'];
    });
  }

}
