import { Component, OnInit, Input } from '@angular/core';

import { ApiService } from './../../_services/api.service';
import { AlertifyService } from './../../_services/alertify.service';

import { Mentee, Login } from './../../_models/all-api-models';

@Component({
  selector: 'app-home-mentee-pane',
  templateUrl: './mentee-pane.component.html',
  styleUrls: ['./mentee-pane.component.css']
})
export class MenteePaneComponent implements OnInit {
  @Input() login: Login;
  model: Mentee;
  showContactForm = false;
  showCancelReqForm = false;
  message = '';
  subject = '';
  showUpdateDateForm = false;
  status = '';

  constructor(
    private apiService: ApiService,
    private alertifyService: AlertifyService,
  ) { }

  ngOnInit() {
    this.apiService.getUserMenteeInfo(this.login.userId).subscribe((mentee: Mentee) => {
      this.model = mentee;
      this.status = this.model.status;
    });
  }
  contact() {
    this.message = '';
    this.subject = '';
    this.showContactForm = true;
  }

  contactConfirm() {
    if (this.login) {
      // TBD: Send Message
      this.alertifyService.message('Message sent!');
      this.cancel();
    }
  }

  cancelMentorship() {
    this.showCancelReqForm = true;
  }

  cancelMentorshipConfirm() {
    if (this.login) {
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
