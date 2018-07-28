import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Login } from '../_models/all-api-models';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-not-logged-in',
  templateUrl: './not-logged-in.component.html',
  styleUrls: ['./not-logged-in.component.css']
})
export class NotLoggedInComponent implements OnInit {
  login: Login;
  imacsWebsiteURL: string;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.login = data['login'];
      if (this.login) {
        this.router.navigate(['/home']);
      }
      this.imacsWebsiteURL = environment.imacsWebsiteURL;
    });
  }
}
