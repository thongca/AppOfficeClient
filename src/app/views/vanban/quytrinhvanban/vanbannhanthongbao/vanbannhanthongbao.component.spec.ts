import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VanbannhanthongbaoComponent } from './vanbannhanthongbao.component';

describe('VanbannhanthongbaoComponent', () => {
  let component: VanbannhanthongbaoComponent;
  let fixture: ComponentFixture<VanbannhanthongbaoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VanbannhanthongbaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VanbannhanthongbaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
