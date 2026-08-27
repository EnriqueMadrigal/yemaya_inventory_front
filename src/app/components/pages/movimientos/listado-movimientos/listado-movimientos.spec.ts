import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoMovimientos } from './listado-movimientos';

describe('ListadoMovimientos', () => {
  let component: ListadoMovimientos;
  let fixture: ComponentFixture<ListadoMovimientos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoMovimientos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoMovimientos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
