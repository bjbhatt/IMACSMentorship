import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from './../../_services/api.service';
import { ApiMockService } from './../../_services/api-mock.service';
import { AlertifyService } from './../../_services/alertify.service';

import { Mentor } from './../../_models/userDetails';

@Component({
  selector: 'app-home-mentor-pane',
  templateUrl: './mentor-pane.component.html',
  styleUrls: ['./mentor-pane.component.css']
})
export class MentorPaneComponent implements OnInit {
  model: Mentor;
  trainingDate: string;
  showContactForm = false;
  showCancelReqForm = false;
  message = '';
  showUpdateDateForm = false;

  constructor(private apiService: ApiMockService, private alertifyService: AlertifyService, private router: Router) { }

  private addYearsToDate(dt: Date, years: number) {
    if (!dt) {
      return null;
    }
    const yy = dt.getFullYear();
    const mm = dt.getMonth();
    const dd = dt.getDate();

    if (years) {
      return new Date(yy + years, mm, dd);
    }
    return dt;
  }

  ngOnInit() {
    this.loadModel();
  }

  loadModel() {
    this.apiService.getUserMentorInfo().subscribe((mentor: Mentor) => {
      this.model = mentor;
    }, error => {
      this.alertifyService.error(error);
    });
  }

  updateDate() {
    this.trainingDate = this.model.trainingDate.toLocaleDateString();
    this.showUpdateDateForm = true;
  }

  updateDateConfirm() {
    // TBD: Save trainingDate
    const today = new Date();
    this.alertifyService.message('Date saved!');
    this.model.trainingDate = new Date(this.trainingDate);
    let years = today.getFullYear() - this.model.trainingDate.getFullYear();
    if (this.model.trainingDate > this.addYearsToDate(today, -5)) {
      years--;
    }
    if (years >= 5) {
      this.model.status = 'eligible';
    }
    this.cancel();
  }

  becomeMentor() {
    // TBD: Save Data
    this.alertifyService.message('Request to become a mentor sent!');
    this.model.status = 'pending';
  }

  contact() {
    this.message = '';
    this.showContactForm = true;
  }

  contactConfirm() {
    // TBD: Send Message
    console.log(this.message);
    this.alertifyService.message('Message sent!');
    this.cancel();
  }

  cancelMentorship() {
    this.showCancelReqForm = true;
  }

  cancelMentorshipConfirm() {
    // TBD: Cancel Mentorship
    this.alertifyService.message('Mentorship cancelled');
    this.model.mentee = null;
    this.cancel();
  }

  cancel() {
    this.showContactForm = false;
    this.showCancelReqForm = false;
    this.showUpdateDateForm = false;
  }
}
