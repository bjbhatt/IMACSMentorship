import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Login } from '../_models/all-api-models';


@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {
  login: Login;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.login = data['login'];
      if (!this.login) {
        this.router.navigate(['/notLoggedIn']);
      } else if (!this.login.isAdmin) {
        this.router.navigate(['/']);
      }
    });
  }
}
