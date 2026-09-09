import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalida } from './add-salida';

describe('AddSalida', () => {
  let component: AddSalida;
  let fixture: ComponentFixture<AddSalida>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSalida]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSalida);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
