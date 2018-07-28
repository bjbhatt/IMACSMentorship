import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';

import { ApiService } from '../_services/api.service';
import { AlertifyService } from '../_services/alertify.service';
import { Login, Mentor } from '../_models/apiModels';

import { Utilities } from '../_helpers/Utilities';

@Component({
  selector: 'app-mentor-requests',
  templateUrl: './mentor-requests.component.html',
  styleUrls: ['./mentor-requests.component.css']
})
export class MentorRequestsComponent implements OnInit {
  login: Login;
  model: Mentor;
  today = new Date();
  showConfirmFormId = 0;
  showDeclineFormId = 0;

  constructor(
    private apiService: ApiService,
    private alertifyService: AlertifyService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.login = data['login'];
      if (!this.login) {
        this.router.navigate(['/notLoggedIn']);
      } else {
        this.apiService.getUserMentorInfo(this.login.userId).subscribe((mentor: Mentor) => {
          this.model = mentor;
        });
      }
    });
}

  acceptMentee(id: number) {
    this.showConfirmFormId = id;
    this.showDeclineFormId = 0;
  }

  confirmAcceptMentee(id: number) {
    // TBD: Accept Mentee
    this.alertifyService.message('Request Accepted');
    this.router.navigate(['/home']);
  }

  declineMentee(id: number) {
    this.showConfirmFormId = 0;
    this.showDeclineFormId = id;
  }

  confirmDeclineMentee(id: number) {
    // TBD: Decline Mentee
    const index = this.model.pendingRequests.findIndex(x => x.userId === id);
    this.model.pendingRequests.splice(index, 1);
    this.alertifyService.message('Request Declined');
    this.cancel();
  }

  diffInDays(dt: Date): Number {
    return Utilities.dateDiffInDays(dt, new Date());
  }

  cancel() {
    this.showConfirmFormId = 0;
    this.showDeclineFormId = 0;
  }
}
