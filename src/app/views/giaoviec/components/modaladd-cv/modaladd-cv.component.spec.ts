import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaladdCvComponent } from './modaladd-cv.component';

describe('ModaladdCvComponent', () => {
  let component: ModaladdCvComponent;
  let fixture: ComponentFixture<ModaladdCvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaladdCvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaladdCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
