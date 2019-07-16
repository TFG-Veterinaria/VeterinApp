import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDesparasitacionesComponent } from './lista-desparasitaciones.component';

describe('ListaDesparasitacionesComponent', () => {
  let component: ListaDesparasitacionesComponent;
  let fixture: ComponentFixture<ListaDesparasitacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDesparasitacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDesparasitacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
