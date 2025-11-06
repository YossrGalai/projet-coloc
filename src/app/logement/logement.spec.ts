import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Logement } from './logement';

describe('Logement', () => {
  let component: Logement;
  let fixture: ComponentFixture<Logement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Logement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Logement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
