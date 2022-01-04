import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabSlideComponent } from './tab-slide.component';

describe('TabSlideComponent', () => {
  let component: TabSlideComponent;
  let fixture: ComponentFixture<TabSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabSlideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
