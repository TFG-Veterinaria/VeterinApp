import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAnaliticasComponent } from './lista-analiticas.component';

describe('ListaAnaliticasComponent', () => {
  let component: ListaAnaliticasComponent;
  let fixture: ComponentFixture<ListaAnaliticasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaAnaliticasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAnaliticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
