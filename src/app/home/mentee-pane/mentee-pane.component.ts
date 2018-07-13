import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from './../../_services/api.service';
import { ApiMockService } from './../../_services/api-mock.service';
import { AlertifyService } from './../../_services/alertify.service';

import { Mentee } from './../../_models/userDetails';

@Component({
  selector: 'app-home-mentee-pane',
  templateUrl: './mentee-pane.component.html',
  styleUrls: ['./mentee-pane.component.css']
})
export class MenteePaneComponent implements OnInit {
  model: Mentee;
  showContactForm = false;
  showCancelReqForm = false;
  message = '';
  showUpdateDateForm = false;

  constructor(private apiService: ApiMockService, private alertifyService: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.loadModel();
  }

  loadModel() {
    this.apiService.getUserMenteeInfo().subscribe((mentee: Mentee) => {
      this.model = mentee;
    }, error => {
      this.alertifyService.error(error);
    });
  }

  contact() {
    this.message = '';
    this.showContactForm = true;
  }

  contactConfirm() {
    // TBD: Send Message
    this.alertifyService.message('Message sent!');
    this.cancel();
  }

  cancelMentorship() {
    this.showCancelReqForm = true;
  }

  cancelMentorshipConfirm() {
    // TBD: Cancel Mentorship
    const message: string =
      this.model.status === 'pending' ?
      'Mentorship request cancelled' :
      'Mentorship cancelled';
    this.alertifyService.message(message);
    this.model.status = 'eligible';
    this.model.mentor = null;
    this.cancel();
  }

  cancel() {
    this.showContactForm = false;
    this.showCancelReqForm = false;
  }
}
