import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUbicacion } from './edit-ubicacion';

describe('EditUbicacion', () => {
  let component: EditUbicacion;
  let fixture: ComponentFixture<EditUbicacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditUbicacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUbicacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
