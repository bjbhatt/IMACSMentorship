import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Login } from './../_models/all-api-models';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  login: Login;
  userId: number;
  params: any;
  userIdMatchesLoginUserId: boolean;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private location: Location) {
      this.route.params.subscribe( params => this.params = params);
    }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.login = data['login'];
      if (!this.login) {
        this.router.navigate(['/notLoggedIn']);
      }
      this.userId = this.params['userId'] ? this.params['userId'] : this.login.userId;
      this.userIdMatchesLoginUserId = this.userId === this.login.userId;
    });
  }

  goBack() {
    this.location.back();
  }
}
