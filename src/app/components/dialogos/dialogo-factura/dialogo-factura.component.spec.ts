import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoFacturaComponent } from './dialogo-factura.component';

describe('DialogoFacturaComponent', () => {
  let component: DialogoFacturaComponent;
  let fixture: ComponentFixture<DialogoFacturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoFacturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
