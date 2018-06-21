import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoClienteComponent } from './dialogo-cliente.component';

describe('DialogoClienteComponent', () => {
  let component: DialogoClienteComponent;
  let fixture: ComponentFixture<DialogoClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
