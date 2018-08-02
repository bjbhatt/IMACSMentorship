import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Login } from './../_models/all-api-models';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @Input() login?: Login;
  @Input() userId?: number;
  @Input() backButtonText?: string;
  @Output() closeUserProfile = new EventEmitter<void>();
  navigated: boolean;
  params: any;
  userIdMatchesLoginUserId: boolean;

  constructor(private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.navigated = this.userId ? false : true;
    if (this.navigated) {
      this.route.params.subscribe(params => {
        this.userId = params['userId'];
        this.backButtonText = 'Back to Home Page';
        this.route.data.subscribe(data => {
          this.login = data['login'];
          if (!this.login) {
            this.router.navigate(['/notLoggedIn']);
          }
          if (!this.userId) {
            this.userId = this.login.userId;
          }
          this.userIdMatchesLoginUserId = this.userId === this.login.userId;
        });
      });
    } else {
      this.userIdMatchesLoginUserId = this.userId === this.login.userId;
    }
  }

  goBack() {
    if (this.navigated) {
      this.router.navigate(['/']);
    } else {
      this.closeUserProfile.emit();
    }
  }

}
