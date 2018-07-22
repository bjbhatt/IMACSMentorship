import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from './../../_services/api.service';
import { AlertifyService } from './../../_services/alertify.service';

import { Mentor, Login } from './../../_models/userDetails';

@Component({
  selector: 'app-home-mentor-pane',
  templateUrl: './mentor-pane.component.html',
  styleUrls: ['./mentor-pane.component.css']
})
export class MentorPaneComponent implements OnInit {
  isLoggedIn: boolean;
  model: Mentor;
  showUpdateDateForm = false;
  trainingDate: string;
  showContactForm = false;
  message = '';
  showCancelReqForm = false;
  showModal: boolean;
  modal_header = '';
  modal_body = '';
  modal_cancel = 'Cancel';
  modal_okay = 'OK';
  modal_context = '';

  constructor(
    private apiService: ApiService,
    private alertifyService: AlertifyService,
    private router: Router
  ) { }

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
    this.apiService.isLoggedInMock().subscribe((login: Login) => {
      this.isLoggedIn = true;
      this.apiService.getUserMentorInfoMock(1).subscribe((mentor: Mentor) => {
        this.model = mentor;
      });
    });
  }

  updateDate() {
    this.trainingDate = this.model.trainingDate.toLocaleDateString();
    this.showUpdateDateForm = true;
  }

  updateDateConfirm() {
    if (this.isLoggedIn) {
      // TBD: Save trainingDate
      const today = new Date();
      this.alertifyService.message('Date saved!');
      this.model.trainingDate = new Date(this.trainingDate);
      let years = today.getFullYear() - this.model.trainingDate.getFullYear();
      if (this.model.trainingDate > this.addYearsToDate(today, -5)) {
        years--;
      }
      if (years >= 5) {
        this.model.status = 'Eligible';
      }
      this.cancel();
    }
  }

  becomeMentor() {
    if (this.isLoggedIn) {
      // TBD: Save Data
      this.alertifyService.message('Your are now a mentor');
      this.model.status = 'Current';
    }
  }

  openModal(open) {
    this.showModal = open;
  }

  contact() {
    this.message = '';
    this.showContactForm = true;
  }

  contactConfirm() {
    if (this.isLoggedIn) {
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
    if (this.isLoggedIn) {
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
