import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoEstadoCuentaComponent } from './dialogo-estado-cuenta.component';

describe('DialogoEstadoCuentaComponent', () => {
  let component: DialogoEstadoCuentaComponent;
  let fixture: ComponentFixture<DialogoEstadoCuentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoEstadoCuentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoEstadoCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
