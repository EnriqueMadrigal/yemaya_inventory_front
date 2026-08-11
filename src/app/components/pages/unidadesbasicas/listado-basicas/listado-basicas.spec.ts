import { ComponentFixture, TestBed } from '@angular/core/testing';


import { Listadounidadbasica } from './listado-basicas';

describe('Listadounidadbasica', () => {
  let component: Listadounidadbasica;
  let fixture: ComponentFixture<Listadounidadbasica>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Listadounidadbasica]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Listadounidadbasica);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
