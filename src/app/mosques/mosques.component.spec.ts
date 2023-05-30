import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MosquesComponent } from './mosques.component';

describe('MosquesComponent', () => {
  let component: MosquesComponent;
  let fixture: ComponentFixture<MosquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MosquesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MosquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
