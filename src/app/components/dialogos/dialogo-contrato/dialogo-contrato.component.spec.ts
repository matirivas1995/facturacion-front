import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoContratoComponent } from './dialogo-contrato.component';

describe('DialogoContratoComponent', () => {
  let component: DialogoContratoComponent;
  let fixture: ComponentFixture<DialogoContratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
