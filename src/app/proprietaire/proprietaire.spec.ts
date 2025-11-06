import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Proprietaire } from './proprietaire';

describe('Proprietaire', () => {
  let component: Proprietaire;
  let fixture: ComponentFixture<Proprietaire>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Proprietaire]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Proprietaire);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
