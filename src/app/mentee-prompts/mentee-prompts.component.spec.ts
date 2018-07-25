import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenteePromptsComponent } from './mentee-prompts.component';

describe('MenteePromptsComponent', () => {
  let component: MenteePromptsComponent;
  let fixture: ComponentFixture<MenteePromptsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenteePromptsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenteePromptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
