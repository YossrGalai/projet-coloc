import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheLogement } from './recherche-logement';

describe('RechercheLogement', () => {
  let component: RechercheLogement;
  let fixture: ComponentFixture<RechercheLogement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RechercheLogement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechercheLogement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
