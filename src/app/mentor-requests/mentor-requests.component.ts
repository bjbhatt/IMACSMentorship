import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { ApiService } from '../_services/api.service';
import { AlertifyService } from '../_services/alertify.service';
import { Login, Mentor } from './../_models/userDetails';

import { Utilities } from '../_helpers/Utilities';

@Component({
  selector: 'app-mentor-requests',
  templateUrl: './mentor-requests.component.html',
  styleUrls: ['./mentor-requests.component.css']
})
export class MentorRequestsComponent implements OnInit {
  model: Mentor;
  isLoggedIn: boolean;
  today = new Date();
  showAcceptDeclineButtons = true;
  showConfirmFormId = 0;
  showDeclineFormId = 0;

  constructor(private apiService: ApiService, private alertifyService: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.loadModel();
  }

  acceptMentee(id: number) {
    this.showConfirmFormId = id;
    this.showAcceptDeclineButtons = false;
  }

  confirmMentee(id: number) {
    // TBD: Accept Mentee
    this.alertifyService.message('Request Accepted');
    this.router.navigate(['/home']);
  }

  declineMentee(id: number) {
    this.showDeclineFormId = id;
    this.showAcceptDeclineButtons = false;
  }

  confirmDeclineMentee(id: number) {
    // TBD: Decline Mentee
    const index = this.model.pendingRequests.findIndex(x => x.userId === id);
    this.model.pendingRequests.splice(index, 1);
    this.alertifyService.message('Request Declined');
    this.cancel();
  }

  loadModel() {
    this.apiService.isLoggedInMock().subscribe((login: Login) => {
      this.isLoggedIn = true;
      this.apiService.getUserMentorInfoMock(1).subscribe((mentor: Mentor) => {
        this.model = mentor;
      });
    });
  }

  diffInDays(dt: Date): Number {
    return Utilities.dateDiffInDays(dt, new Date());
  }

  cancel() {
    this.showAcceptDeclineButtons = true;
    this.showConfirmFormId = 0;
    this.showDeclineFormId = 0;
  }
}
