import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CauhinhnguoinhanComponent } from './cauhinhnguoinhan.component';

describe('CauhinhnguoinhanComponent', () => {
  let component: CauhinhnguoinhanComponent;
  let fixture: ComponentFixture<CauhinhnguoinhanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CauhinhnguoinhanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CauhinhnguoinhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
