import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from './../../_services/api.service';
import { AlertifyService } from './../../_services/alertify.service';

import { Utilities } from './../../_helpers/Utilities';

import { Mentor, Login } from './../../_models/userDetails';

@Component({
  selector: 'app-home-mentor-pane',
  templateUrl: './mentor-pane.component.html',
  styleUrls: ['./mentor-pane.component.css']
})
export class MentorPaneComponent implements OnInit {
  login: Login;
  model: Mentor;
  showUpdateDateForm = false;
  trainingDate: string;
  showContactForm = false;
  message = '';
  showCancelReqForm = false;
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
      this.login = login;
      this.apiService.getUserMentorInfo(login.userId).subscribe((mentor: Mentor) => {
        this.model = mentor;
        this.status = mentor.status;
      });
    });
  }

  updateDate() {
    this.trainingDate = this.model.trainingDate;
    this.showUpdateDateForm = true;
  }

  updateDateConfirm() {
    if (this.login && this.trainingDate) {
      // TBD: Save trainingDate
      this.model.trainingDate = this.trainingDate;
      this.apiService.updateMentorTrainingDate(this.login.userId, new Date(this.model.trainingDate)).subscribe(() => {
        const today = new Date();
        this.alertifyService.message('Date saved!');
        let years = today.getFullYear() - new Date(this.model.trainingDate).getFullYear();
        if (new Date(this.model.trainingDate) > Utilities.addYearsToDate(today, -5)) {
          years--;
        }
        if (years >= 5) {
          this.model.status = 'Eligible';
          this.status = 'Eligible';
        }
        this.cancel();
      });
    }
  }

  becomeMentor() {
    if (this.login) {
      // TBD: Save Data
      this.alertifyService.message('Your are now a mentor');
      this.model.status = 'Current';
    }
  }

  contact() {
    this.message = '';
    this.showContactForm = true;
  }

  contactConfirm() {
    if (this.login) {
      // TBD: Send Message
      console.log(this.message);
      this.alertifyService.message('Message sent');
      this.cancel();
    }
  }

  cancelMentorship() {
    this.showCancelReqForm = true;
  }

  cancelMentorshipConfirm() {
    if (this.login) {
      // TBD: Cancel Mentorship
      this.alertifyService.message('Mentorship cancelled');
      this.model.currentMentee = null;
      this.cancel();
    }
  }

  cancel() {
    this.showContactForm = false;
    this.showCancelReqForm = false;
    this.showUpdateDateForm = false;
  }
}
