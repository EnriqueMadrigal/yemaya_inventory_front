import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoFamilias } from './listado-familias';

describe('ListadoFamilias', () => {
  let component: ListadoFamilias;
  let fixture: ComponentFixture<ListadoFamilias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoFamilias]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoFamilias);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
