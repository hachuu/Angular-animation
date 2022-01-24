import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgmapComponent } from './agmap.component';

describe('AgmapComponent', () => {
  let component: AgmapComponent;
  let fixture: ComponentFixture<AgmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
