import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OptionGrouproleComponent } from './option-grouprole.component';

describe('OptionGrouproleComponent', () => {
  let component: OptionGrouproleComponent;
  let fixture: ComponentFixture<OptionGrouproleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionGrouproleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionGrouproleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
