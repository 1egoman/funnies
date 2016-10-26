/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FunniesComponent } from './funnies.component';

describe('FunniesComponent', () => {
  let component: FunniesComponent;
  let fixture: ComponentFixture<FunniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
