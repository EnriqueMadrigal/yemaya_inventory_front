import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionaHistoria } from './seleciona-historia';

describe('SelecionaHistoria', () => {
  let component: SelecionaHistoria;
  let fixture: ComponentFixture<SelecionaHistoria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelecionaHistoria]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelecionaHistoria);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
