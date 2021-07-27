import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PermissionmoduleComponent } from './permissionmodule.component';

describe('PermissionmoduleComponent', () => {
  let component: PermissionmoduleComponent;
  let fixture: ComponentFixture<PermissionmoduleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionmoduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionmoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
