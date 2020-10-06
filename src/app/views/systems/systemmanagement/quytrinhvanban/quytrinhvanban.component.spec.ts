import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuytrinhvanbanComponent } from './quytrinhvanban.component';

describe('QuytrinhvanbanComponent', () => {
  let component: QuytrinhvanbanComponent;
  let fixture: ComponentFixture<QuytrinhvanbanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuytrinhvanbanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuytrinhvanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
