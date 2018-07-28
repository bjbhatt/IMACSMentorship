import { MentorSearch } from '../../_models/apiModels';
import { MentorSearchOptions } from '../../_models/mentorSearchOptions';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mentor-search-result',
  templateUrl: './mentor-search-result.component.html',
  styleUrls: ['./mentor-search-result.component.css']
})
export class MentorSearchResultComponent implements OnInit {
  @Input() mentorSearchOptions: MentorSearchOptions;
  model: MentorSearch[];

  constructor() { }

  ngOnInit() {
    console.log(this.mentorSearchOptions);
  }

}
