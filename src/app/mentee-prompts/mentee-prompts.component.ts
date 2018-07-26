import { MentorOptions } from './../_models/mentorOptions';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '../../../node_modules/@angular/router';
import { Login } from '../_models/userDetails';

@Component({
  selector: 'app-mentee-prompts',
  templateUrl: './mentee-prompts.component.html',
  styleUrls: ['./mentee-prompts.component.css']
})
export class MenteePromptsComponent implements OnInit {
  model: MentorOptions;
  isLoggedIn: boolean;
  step = 1;

  constructor(private apiService: ApiService, private alertifyService: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.loadModel();
    this.model = {
      clinicalCare: null,
      focus: null,
      specialization: [],
      expertise: [],
      location: [],
    };
  }

  loadModel() {
    this.apiService.isLoggedIn().subscribe((login: Login) => {
      this.isLoggedIn = true;
    });
  }

  setClinical(clinical?: string) {
    this.model.clinicalCare = clinical;
    console.log(clinical);
  }

  setFocus(focus?: string) {
    this.model.focus = focus;
    console.log(focus);
  }

  setSpecialization(specialization?: string) {
    const index = this.model.specialization.indexOf(specialization, 0);
    if (specialization === 'n/a') {
      if (index > -1) {
        this.model.specialization.splice(index, 1);
      } else {
        this.model.specialization = [];
        this.model.specialization.push('n/a');
      }
    }
    else if (index > -1) {
      this.model.specialization.splice(index, 1);
    } else {
      const index_na = this.model.specialization.indexOf('n/a', 0);
      if (index_na > -1) {
        this.model.specialization.splice(index_na, 1);
      }
      this.model.specialization.push(specialization);
    }
    console.log(this.model.specialization);
  }

  nextPage() {
    if (this.step < 5) {
      this.step++;
    }
  }

  previousPage() {
    if (this.step > 1) {
      this.step--;
    }
  }

  disableNext() {
    if ((this.step === 1 && this.model.clinicalCare == null)
    || (this.step === 2 && this.model.focus == null)
    || (this.step === 3 && this.model.specialization.length === 0)) {
      return true;
    } else {
      return false;
    }
  }
}
