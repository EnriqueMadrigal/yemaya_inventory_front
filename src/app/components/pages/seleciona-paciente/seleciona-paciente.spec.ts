import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionaPaciente } from './seleciona-paciente';

describe('SelecionaPaciente', () => {
  let component: SelecionaPaciente;
  let fixture: ComponentFixture<SelecionaPaciente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelecionaPaciente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelecionaPaciente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
