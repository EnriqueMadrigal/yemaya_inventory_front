import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoMarcas } from './listado-marcas';

describe('ListadoMarcas', () => {
  let component: ListadoMarcas;
  let fixture: ComponentFixture<ListadoMarcas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoMarcas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoMarcas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
