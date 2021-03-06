import { Component, OnInit, Input } from '@angular/core';

import { ApiService } from './../../_services/api.service';
import { AlertifyService } from './../../_services/alertify.service';

import { Utilities } from './../../_helpers/Utilities';

import { Mentor, Login } from './../../_models/all-api-models';

@Component({
  selector: 'app-home-mentor-pane',
  templateUrl: './mentor-pane.component.html',
  styleUrls: ['./mentor-pane.component.css']
})
export class MentorPaneComponent implements OnInit {
  @Input() login: Login;
  model: Mentor;
  showUpdateDateForm = false;
  trainingDate: string;
  showContactForm = false;
  message = '';
  subject = '';
  showCancelReqForm = false;
  status = '';

  constructor(
    private apiService: ApiService,
    private alertifyService: AlertifyService
  ) { }

  ngOnInit() {
    this.apiService.getUserMentorInfo(this.login.userId).subscribe((mentor: Mentor) => {
      this.model = mentor;
      this.status = mentor.status;
    });
  }

  updateDate() {
    this.trainingDate = this.model.trainingDate;
    this.showUpdateDateForm = true;
  }

  updateDateConfirm() {
    if (this.trainingDate || this.trainingDate !== 'Invalid Date') {
      this.apiService.updateMentorTrainingDate(this.login.userId, this.trainingDate).subscribe((mentorInfo: Mentor) => {
        this.model = mentorInfo;
        this.status = this.model.status;
        this.cancel();
        this.alertifyService.message('Date saved!');
      });
    }
  }

  becomeMentor() {
    // TBD: Save Data
    this.alertifyService.message('Your are now a mentor');
    this.model.status = 'Current';
    this.status = 'Current';
  }

  contact() {
    this.message = '';
    this.subject = '';
    this.showContactForm = true;
  }

  contactConfirm() {
    // TBD: Send Message
    console.log(this.message);
    this.alertifyService.message('Message sent');
    this.cancel();
  }

  cancelMentorship() {
    this.showCancelReqForm = true;
  }

  cancelMentorshipConfirm() {
    // TBD: Cancel Mentorship
    this.alertifyService.message('Mentorship cancelled');
    this.model.currentMentee = null;
    this.cancel();
  }

  cancel() {
    this.showContactForm = false;
    this.showCancelReqForm = false;
    this.showUpdateDateForm = false;
  }
}
