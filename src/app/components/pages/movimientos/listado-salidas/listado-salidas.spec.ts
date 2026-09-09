import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoSalidas } from './listado-salidas';

describe('ListadoSalidas', () => {
  let component: ListadoSalidas;
  let fixture: ComponentFixture<ListadoSalidas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoSalidas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoSalidas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
