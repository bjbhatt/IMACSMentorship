import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from './../../_services/api.service';
import { AlertifyService } from './../../_services/alertify.service';

import { Utilities } from './../../_helpers/Utilities';

import { Mentee, Login } from './../../_models/userDetails';

@Component({
  selector: 'app-home-mentee-pane',
  templateUrl: './mentee-pane.component.html',
  styleUrls: ['./mentee-pane.component.css']
})
export class MenteePaneComponent implements OnInit {
  isLoggedIn: boolean;
  model: Mentee;
  showContactForm = false;
  showCancelReqForm = false;
  message = '';
  showUpdateDateForm = false;
  status = '';

  constructor(
    private apiService: ApiService,
    private alertifyService: AlertifyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadModel();
  }

  loadModel() {
    this.apiService.isLoggedIn().subscribe((login: Login) => {
      this.isLoggedIn = true;
      this.apiService.getUserMenteeInfo(1).subscribe((mentee: Mentee) => {
        this.model = mentee;
        this.status = this.model.status;
      });
    });
  }

  contact() {
    this.message = '';
    this.showContactForm = true;
  }

  contactConfirm() {
    if (this.isLoggedIn) {
      // TBD: Send Message
      this.alertifyService.message('Message sent!');
      this.cancel();
    }
  }

  cancelMentorship() {
    this.showCancelReqForm = true;
  }

  cancelMentorshipConfirm() {
    if (this.isLoggedIn) {
      // TBD: Cancel Mentorship
      const message: string =
        this.model.status === 'Pending'
          ? 'Mentorship request cancelled'
          : 'Mentorship cancelled';
      this.alertifyService.message(message);
      this.model.status = 'Eligible';
      this.status = 'Eligible';
      this.model.currentMentor = null;
      this.cancel();
    }
  }

  cancel() {
    this.showContactForm = false;
    this.showCancelReqForm = false;
  }
}
