import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ApiService } from './../../_services/api.service';

import { MentorSearch, Login } from './../../_models/all-api-models';
import { MentorSearchOptions } from './../../_models/mentorship-search-options';
import { AlertifyService } from './../../_services/alertify.service';
import { ActivatedRoute, Router } from './../../../../node_modules/@angular/router';
import { PageChangedEvent} from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-mentor-search-result',
  templateUrl: './mentor-search-result.component.html',
  styleUrls: ['./mentor-search-result.component.css']
})
export class MentorSearchResultComponent implements OnInit {
  @Input() login: Login;
  @Input() mentorSearchOptions: MentorSearchOptions;
  @Output() refineSearchEvent = new EventEmitter<MentorSearchOptions>();
  model: MentorSearch[];
  mentorSelected: MentorSearch;
  message = '';
  subject = '';
  page = 1;
  returnedArray: MentorSearch[];

  constructor(
    private apiService: ApiService,
    private alertifyService: AlertifyService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.mentorSelected = null;
    this.route.data.subscribe(data => {
      this.login = data['login'];
      if (!this.login) {
        this.router.navigate(['/notLoggedIn']);
      } else {
        // TBD : Read search results from the model.
        // this.model = [];
        this.model = [{
          userId: 9,
          fullName: 'Sagar Thakore',
          emailAddress: 'sagar@mentee.com',
          degree: 'PHD, MD',
          location: 'Duke University',
          available: true,
          availableAfter: null
        },
        {
          userId: 10,
          fullName: 'John Doe',
          emailAddress: 'John@mentee.com',
          degree: 'MD, MBBS',
          location: 'XYZ University',
          available: true,
          availableAfter: null
        },
        {
          userId: 10,
          fullName: 'John Doe',
          emailAddress: 'John@mentee.com',
          degree: 'MD, MBBS',
          location: 'XYZ University',
          available: true,
          availableAfter: null
        },
        {
          userId: 10,
          fullName: 'John Doe',
          emailAddress: 'John@mentee.com',
          degree: 'MD, MBBS',
          location: 'XYZ University',
          available: true,
          availableAfter: null
        },
        {
          userId: 10,
          fullName: 'John Doe',
          emailAddress: 'John@mentee.com',
          degree: 'MD, MBBS',
          location: 'XYZ University',
          available: true,
          availableAfter: null
        },
        {
          userId: 10,
          fullName: 'John Doe',
          emailAddress: 'John@mentee.com',
          degree: 'MD, MBBS',
          location: 'XYZ University',
          available: true,
          availableAfter: null
        },
        {
          userId: 10,
          fullName: 'John Doe',
          emailAddress: 'John@mentee.com',
          degree: 'MD, MBBS',
          location: 'XYZ University',
          available: true,
          availableAfter: null
        },
        {
          userId: 10,
          fullName: 'John Doe',
          emailAddress: 'John@mentee.com',
          degree: 'MD, MBBS',
          location: 'XYZ University',
          available: true,
          availableAfter: null
        }
        ];
        this.returnedArray = this.model.slice(0, 5);
      }
    });
    console.log(this.login);
    console.log(this.mentorSearchOptions);
  }

  refineSearch() {
    this.refineSearchEvent.emit(this.mentorSearchOptions);
  }

  requestMentorship(userId: number) {
    this.mentorSelected = this.model.find(x => x.userId === userId);
    this.subject = 'Mentorship Request';
    this.message = 'Dear ' + this.mentorSelected.fullName + ', \n\n'
    + 'I am writing to ask if you will me be my IMACS mentor. I am amet linc, lorem Ipsum dolor set amet quo nunc status amet linc…';
  }

  requestMentorshipConfirm(userId: number) {
    // TBD: Send Message
    console.log(this.subject);
    console.log(this.message);
    this.alertifyService.message('Message sent');
    this.cancel();
    this.router.navigate(['/']);
  }

  showUserProfile(userId: number) {
    this.router.navigate(['/profile', userId]);
  }

  cancel() {
    this.mentorSelected = null;
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.model.slice(startItem, endItem);
  }

}
