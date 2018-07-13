/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MenteePaneComponent } from './mentee-pane.component';

describe('MenteePaneComponent', () => {
  let component: MenteePaneComponent;
  let fixture: ComponentFixture<MenteePaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenteePaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenteePaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
