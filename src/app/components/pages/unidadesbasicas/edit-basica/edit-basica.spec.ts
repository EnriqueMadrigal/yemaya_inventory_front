import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Editbasica } from './edit-basica';

describe('Editbasica', () => {
  let component: Editbasica;
  let fixture: ComponentFixture<Editbasica>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Editbasica]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Editbasica);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
