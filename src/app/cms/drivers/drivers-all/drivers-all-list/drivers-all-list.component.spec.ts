import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversAllListComponent } from './drivers-all-list.component';

describe('DriversAllListComponent', () => {
  let component: DriversAllListComponent;
  let fixture: ComponentFixture<DriversAllListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriversAllListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriversAllListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
