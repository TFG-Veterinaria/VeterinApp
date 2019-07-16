import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaVacunasComponent } from './lista-vacunas.component';

describe('ListaVacunasComponent', () => {
  let component: ListaVacunasComponent;
  let fixture: ComponentFixture<ListaVacunasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaVacunasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaVacunasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
