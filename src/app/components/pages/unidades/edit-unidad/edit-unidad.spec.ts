import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUnidad } from './edit-unidad';

describe('EditUnidad', () => {
  let component: EditUnidad;
  let fixture: ComponentFixture<EditUnidad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditUnidad]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUnidad);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
