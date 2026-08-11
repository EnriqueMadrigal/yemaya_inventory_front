import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoUbicacion } from './listado-ubicacion';

describe('ListadoUbicacion', () => {
  let component: ListadoUbicacion;
  let fixture: ComponentFixture<ListadoUbicacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoUbicacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoUbicacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
