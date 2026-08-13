import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMarca } from './edit-marca';

describe('EditMarca', () => {
  let component: EditMarca;
  let fixture: ComponentFixture<EditMarca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMarca]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMarca);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
