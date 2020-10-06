import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VanbandapheduyetComponent } from './vanbandapheduyet.component';

describe('VanbandapheduyetComponent', () => {
  let component: VanbandapheduyetComponent;
  let fixture: ComponentFixture<VanbandapheduyetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VanbandapheduyetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VanbandapheduyetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
