import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MosqueComponent } from './mosque.component';

describe('MosqueComponent', () => {
  let component: MosqueComponent;
  let fixture: ComponentFixture<MosqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MosqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MosqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
