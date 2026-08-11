import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFamilia } from './edit-familia';

describe('EditFamilia', () => {
  let component: EditFamilia;
  let fixture: ComponentFixture<EditFamilia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFamilia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFamilia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
