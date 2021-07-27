import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QuytrinhvanbanComponent } from './quytrinhvanban.component';

describe('QuytrinhvanbanComponent', () => {
  let component: QuytrinhvanbanComponent;
  let fixture: ComponentFixture<QuytrinhvanbanComponent>;

  beforeEach(waitForAsync(() => {
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
