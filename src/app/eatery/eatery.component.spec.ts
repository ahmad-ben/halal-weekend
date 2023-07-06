import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EateryComponent } from './eatery.component';

describe('EateryComponent', () => {
  let component: EateryComponent;
  let fixture: ComponentFixture<EateryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ EateryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EateryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
