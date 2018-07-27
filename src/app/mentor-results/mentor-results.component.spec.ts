import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorResultsComponent } from './mentor-results.component';

describe('MentorResultsComponent', () => {
  let component: MentorResultsComponent;
  let fixture: ComponentFixture<MentorResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
