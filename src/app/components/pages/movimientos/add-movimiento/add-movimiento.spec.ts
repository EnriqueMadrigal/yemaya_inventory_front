import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMovimiento } from './add-movimiento';

describe('AddMovimiento', () => {
  let component: AddMovimiento;
  let fixture: ComponentFixture<AddMovimiento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMovimiento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMovimiento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
