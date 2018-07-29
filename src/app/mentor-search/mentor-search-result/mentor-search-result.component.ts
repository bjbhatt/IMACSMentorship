import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ApiService } from './../../_services/api.service';

import { MentorSearch, Login } from './../../_models/all-api-models';
import { MentorSearchOptions } from './../../_models/mentorship-search-options';

@Component({
  selector: 'app-mentor-search-result',
  templateUrl: './mentor-search-result.component.html',
  styleUrls: ['./mentor-search-result.component.css']
})
export class MentorSearchResultComponent implements OnInit {
  @Input() login: Login;
  @Input() mentorSearchOptions: MentorSearchOptions;
  @Output() searchAgainEvent = new EventEmitter<MentorSearchOptions>();
  model: MentorSearch[];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    console.log(this.login);
    console.log(this.mentorSearchOptions);
  }

  refineSearch() {
    this.searchAgainEvent.emit(this.mentorSearchOptions);
  }
}
