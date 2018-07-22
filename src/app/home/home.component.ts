import { Login } from './../_models/userDetails';
import { ApiService } from './../_services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loadModel();
  }

  loadModel() {
    this.apiService.isLoggedInMock().subscribe((login: Login) => {
      this.isLoggedIn = true;
    });
  }

}
