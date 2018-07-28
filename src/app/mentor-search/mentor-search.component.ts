import { MentorSearchOptions } from '../_models/mentorship-search-options';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Login } from '../_models/all-api-models';

@Component({
  selector: 'app-mentor-search',
  templateUrl: './mentor-search.component.html',
  styleUrls: ['./mentor-search.component.css']
})
export class MentorSearchComponent implements OnInit {
  login: Login;
  model: MentorSearchOptions;
  optionsComplete = false;
  step = 1;
  specializations: Map<string, string>;
  expertises: Map<string, string>;
  locations: Map<string, string>;

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
      }
    });
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

  searchMentor() {
    // this.step++;
    // if (this.model != null) {
    //   // TBD : Service call to get mentor search results based on parameters passed from the model.
    //   setTimeout(() => { // TBD : Remove timeout after implementing service.
    //     this.router.navigate(['/results']);
    //   },
    // 3000);
    // }
    this.optionsComplete = true;
  }
}
