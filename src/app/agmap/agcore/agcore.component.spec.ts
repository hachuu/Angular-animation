import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgcoreComponent } from './agcore.component';

describe('AgcoreComponent', () => {
  let component: AgcoreComponent;
  let fixture: ComponentFixture<AgcoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgcoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgcoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
