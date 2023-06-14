import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceCardComponent } from './place-card.component';

describe('PlaceCardComponent', () => {
  let component: PlaceCardComponent;
  let fixture: ComponentFixture<PlaceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PlaceCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
