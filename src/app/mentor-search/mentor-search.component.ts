import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Login } from './../_models/all-api-models';
import { MentorSearchOptions } from './../_models/mentorship-search-options';

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
  clinicalForms: Map<number, string>;
  patientTypes: Map<number, string>;
  researchAreas: Map<number, string>;
  locations: Map<string, string>;

  constructor(
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
      patients: null,
      patientType: null,
      clinicalForm: [],
      researchArea: [],
      location: [],
    };
    this.patientTypes = new Map<number, string>()
      .set(1, 'Adult')
      .set(2, 'Juvenile')
      .set(3, 'Both')
      .set(0, 'Doesn\'t Matter');
    this.clinicalForms = new Map<number, string>()
      .set(1, 'Dermatomyositis')
      .set(2, 'Polymyositis')
      .set(3, 'Inclusion Body Myositis')
      .set(0, 'Doesn\'t Matter');
    this.researchAreas = new Map<number, string>()
      .set(1, 'Epidemiology')
      .set(2, 'Diagnostic/Classification/Subclassification Criteria')
      .set(4, 'Clinical presentation and manisfestations')
      .set(5, 'Natural history of disease')
      .set(6, 'Genetic risk factors')
      .set(7, 'Disease assessment')
      .set(8, 'Outcomes research')
      .set(9, 'Therapy / prognosis')
      .set(10, 'Clinical trials')
      .set(11, 'Muscle structure or ultrastructure')
      .set(12, 'Muscle molecular biology, biochemistry or function')
      .set(13, 'Environmental factors / myotoxins')
      .set(14, 'Animal models')
      .set(15, 'Pathology')
      .set(16, 'Immunology')
      .set(17, 'Pathogenesis of disease')
      .set(18, 'Pre-clinical therapeutic development')
      .set(19, 'Other')
      .set(20, 'this is a test mysositis which is very long text and it is longer than before now for testing')
      .set(0, 'Doesn\'t Matter');
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

  setPatient(patient?: string) {
    this.model.patients = patient;
  }

  setPatientType(patientType?: number) {
    this.model.patientType = patientType;
  }

  setClinicalForm(clinicalForm?: number) {
    const index = this.model.clinicalForm.indexOf(clinicalForm, 0);
    if (clinicalForm === 0) {
      if (index > -1) {
        this.model.clinicalForm.splice(index, 1);
      } else {
        this.model.clinicalForm = [];
        this.model.clinicalForm.push(0);
      }
    } else if (index > -1) {
      this.model.clinicalForm.splice(index, 1);
    } else {
      const index_na = this.model.clinicalForm.indexOf(0, 0);
      if (index_na > -1) {
        this.model.clinicalForm.splice(index_na, 1);
      }
      this.model.clinicalForm.push(clinicalForm);
    }
  }

  setResearchArea(researchArea?: number) {
    const index = this.model.researchArea.indexOf(researchArea, 0);
    if (researchArea === 0) {
      if (index > -1) {
        this.model.researchArea.splice(index, 1);
      } else {
        this.model.researchArea = [];
        this.model.researchArea.push(0);
      }
    } else if (index > -1) {
      this.model.researchArea.splice(index, 1);
    } else {
      const index_na = this.model.researchArea.indexOf(0, 0);
      if (index_na > -1) {
        this.model.researchArea.splice(index_na, 1);
      }
      this.model.researchArea.push(researchArea);
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

  isStepComplete(num) {
    if ((num === 1 && this.model.patients == null)
      || (num === 2 && this.model.patientType == null)
      || (num === 3 && this.model.clinicalForm.length === 0)
      || (num === 4 && this.model.researchArea.length === 0)
      || (num === 5 && this.model.location.length === 0)) {
      return false;
    } else {
      return true;
    }
  }

  navigateTo(num) {
    if ((this.previousStepsComplete(num - 1)
      && this.isStepComplete(this.step))
      || num <= this.step) {
      this.step = num;
    }
  }

  disableProgress(num) {
    if ((this.previousStepsComplete(num - 1)
      && this.isStepComplete(this.step))
      || num <= this.step) {
      return false;
    } else {
      return true;
    }
  }

  disableNext() {
    if (this.isStepComplete(this.step)) {
      return false;
    } else {
      return true;
    }
  }

  previousStepsComplete(pos) {
    let complete = true;
    for (let i = 1; i < pos; i++) {
      if (!this.isStepComplete(pos)) {
        complete = false;
      }
    }
    return complete;
  }

  disableSearch() {
    if (
      this.isStepComplete(1)
      && this.isStepComplete(2)
      && this.isStepComplete(3)
      && this.isStepComplete(4)
      && this.isStepComplete(5)
    ) {
      return false;
    } else {
      return true;
    }
  }

  progress(pos) {
    if (this.isStepComplete(pos) && pos !== this.step) {
      return 'done';
    } else if (this.step === pos) {
      return 'current';
    } else if (this.isStepComplete(pos - 1)) {
      return 'complete';
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

  refineSearchEventHandler($event: MentorSearchOptions) {
    this.model = $event;
    this.step = 5;
    this.optionsComplete = false;
  }
}
