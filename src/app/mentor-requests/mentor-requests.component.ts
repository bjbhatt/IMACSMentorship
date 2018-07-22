import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router, RouterLink } from '@angular/router';
import { Mentor } from '../_models/userDetails';

@Component({
  selector: 'app-mentor-requests',
  templateUrl: './mentor-requests.component.html',
  styleUrls: ['./mentor-requests.component.css']
})
export class MentorRequestsComponent implements OnInit {
  model: Mentor;
  isLoggedIn: boolean;

  constructor(private apiService: ApiService, private alertifyService: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.loadModel();
  }

  acceptMentee(id: number) {
    // TBD: Accept Mentee
    console.log(id);
    this.router.navigate(['/home']);
  }

  loadModel() {
    this.apiService.isLoggedInMock().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
      this.apiService.getUserMentorInfoMock().subscribe((mentor: Mentor) => {
        this.model = mentor;
      }, error => {
        this.alertifyService.error(error);
      });
    });
  }
}
