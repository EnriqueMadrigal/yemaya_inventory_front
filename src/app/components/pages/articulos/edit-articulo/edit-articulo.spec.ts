import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArticulo } from './edit-articulo';

describe('EditArticulo', () => {
  let component: EditArticulo;
  let fixture: ComponentFixture<EditArticulo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditArticulo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditArticulo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
