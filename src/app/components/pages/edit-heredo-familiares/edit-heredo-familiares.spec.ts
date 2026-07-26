import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHeredoFamiliares } from './edit-heredo-familiares';

describe('EditHeredoFamiliares', () => {
  let component: EditHeredoFamiliares;
  let fixture: ComponentFixture<EditHeredoFamiliares>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditHeredoFamiliares]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditHeredoFamiliares);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
