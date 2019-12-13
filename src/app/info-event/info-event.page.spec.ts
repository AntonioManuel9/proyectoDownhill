import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoEventPage } from './info-event.page';

describe('InfoEventPage', () => {
  let component: InfoEventPage;
  let fixture: ComponentFixture<InfoEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoEventPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
