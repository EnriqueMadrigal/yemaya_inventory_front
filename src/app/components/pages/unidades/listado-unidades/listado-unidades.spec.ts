import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoUnidades } from './listado-unidades';

describe('ListadoUnidades', () => {
  let component: ListadoUnidades;
  let fixture: ComponentFixture<ListadoUnidades>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoUnidades]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoUnidades);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
