import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilestonesListItemComponent } from './milestones-list-item.component';

describe('MilestonesListItemComponent', () => {
  let component: MilestonesListItemComponent;
  let fixture: ComponentFixture<MilestonesListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MilestonesListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilestonesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
