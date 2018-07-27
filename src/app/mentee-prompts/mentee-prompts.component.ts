import { MentorOptions } from './../_models/mentorOptions';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
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
  specializations: Map<string, string>;
  expertises: Map<string, string>;
  locations: Map<string, string>;

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
    this.specializations = new Map<string, string>()
      .set('dermatomyositis', 'Dermato-myositis')
      .set('polymyositis', 'Polymyositis')
      .set('inclusion_body_myositis', 'Inclusion Body Myositis')
      .set('n/a', 'Doesn\'t Matter');
    this.expertises = new Map<string, string>()
      .set('epidemiology', 'Epidemiology')
      .set('disease_assesment', 'Disease Assesment')
      .set('clinical_trials_therapy', 'Clinical Trials/Therapy')
      .set('disease_history', 'Disease History')
      .set('pathology', 'Pathology')
      .set('outcomes', 'Outcomes')
      .set('muscle_molecular_biology', 'Muscle Molecular Biology')
      .set('immunology', 'Immunology');
    this.locations = new Map<string, string>()
      .set('north_america', 'North America')
      .set('europe', 'Europe')
      .set('asia', 'Asia')
      .set('central_america', 'Central America')
      .set('south_america', 'South America')
      .set('africa', 'Africa')
      .set('australia', 'Australia')
      .set('n/a', 'Any Location');
  }

  getKeys(map) {
    return Array.from(map.keys());
  }

  loadModel() {
    this.apiService.isLoggedIn().subscribe((login: Login) => {
      this.isLoggedIn = true;
    });
  }

  setClinical(clinical?: string) {
    this.model.clinicalCare = clinical;
  }

  setFocus(focus?: string) {
    this.model.focus = focus;
  }

  // TBD : Wish to use this unified function but getting issues.
  // using individual funtions for now.
  // setData(string?: string, array?: string[]) {
  //   const index = array.indexOf(string, 0);
  //   if (string === 'n/a') {
  //     if (index > -1) {
  //       array = [];
  //     } else {
  //       array = [];
  //       array.push(string);
  //     }
  //   } else if (index > -1) {
  //     array.splice(index, 1);
  //   } else {
  //     const index_na = array.indexOf('n/a', 0);
  //     if (index_na > -1) {
  //       array.splice(index_na, 1);
  //     }
  //     array.push(string);
  //   }
  //   console.log(array);
  // }

  setSpecialization(specialization?: string) {
    const index = this.model.specialization.indexOf(specialization, 0);
    if (specialization === 'n/a') {
      if (index > -1) {
        this.model.specialization.splice(index, 1);
      } else {
        this.model.specialization = [];
        this.model.specialization.push('n/a');
      }
    } else if (index > -1) {
      this.model.specialization.splice(index, 1);
    } else {
      const index_na = this.model.specialization.indexOf('n/a', 0);
      if (index_na > -1) {
        this.model.specialization.splice(index_na, 1);
      }
      this.model.specialization.push(specialization);
    }
  }

  setExpertise(expertise?: string) {
    const index = this.model.expertise.indexOf(expertise, 0);
    if (expertise === 'n/a') {
      if (index > -1) {
        this.model.expertise.splice(index, 1);
      } else {
        this.model.expertise = [];
        this.model.expertise.push('n/a');
      }
    } else if (index > -1) {
      this.model.expertise.splice(index, 1);
    } else {
      const index_na = this.model.expertise.indexOf('n/a', 0);
      if (index_na > -1) {
        this.model.expertise.splice(index_na, 1);
      }
      this.model.expertise.push(expertise);
    }
  }

  setLocation(location?: string) {
    const index = this.model.location.indexOf(location, 0);
    if (location === 'n/a') {
      if (index > -1) {
        this.model.location.splice(index, 1);
      } else {
        this.model.location = [];
        this.model.location.push('n/a');
      }
    } else if (index > -1) {
      this.model.location.splice(index, 1);
    } else {
      const index_na = this.model.location.indexOf('n/a', 0);
      if (index_na > -1) {
        this.model.location.splice(index_na, 1);
      }
      this.model.location.push(location);
    }
  }

  nextPage() {
    if (this.step < 6) {
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
      || (this.step === 3 && this.model.specialization.length === 0)
      || (this.step === 4 && this.model.expertise.length === 0)
      || (this.step === 5 && this.model.location.length === 0)) {
      return true;
    } else {
      return false;
    }
  }
}
