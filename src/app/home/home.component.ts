import { ApiMockService } from './../_services/api-mock.service';
import { ApiService } from './../_services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn: boolean;
  constructor(private apiService: ApiMockService) { }

  ngOnInit() {
    this.loadModel();
  }

  loadModel() {
    this.apiService.isLoggedIn().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
  }

}
