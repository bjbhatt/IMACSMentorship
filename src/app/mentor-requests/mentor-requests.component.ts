import { Component, OnInit } from '@angular/core';
import { ApiMockService } from '../_services/api-mock.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { Mentor } from '../_models/userDetails';

@Component({
  selector: 'app-mentor-requests',
  templateUrl: './mentor-requests.component.html',
  styleUrls: ['./mentor-requests.component.css']
})
export class MentorRequestsComponent implements OnInit {
  model: Mentor;
  isLoggedIn: boolean;

  constructor(private apiService: ApiMockService, private alertifyService: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.loadModel();
  }

  loadModel() {
    this.apiService.isLoggedIn().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
      this.apiService.getUserMentorInfo().subscribe((mentor: Mentor) => {
        this.model = mentor;
      }, error => {
        this.alertifyService.error(error);
      });
    });
  }
}
