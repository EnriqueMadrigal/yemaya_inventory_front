import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoInventario } from './listado-inventario';

describe('ListadoInventario', () => {
  let component: ListadoInventario;
  let fixture: ComponentFixture<ListadoInventario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoInventario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoInventario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
