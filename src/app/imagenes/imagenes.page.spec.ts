import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenesPage } from './imagenes.page';

describe('ImagenesPage', () => {
  let component: ImagenesPage;
  let fixture: ComponentFixture<ImagenesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagenesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
