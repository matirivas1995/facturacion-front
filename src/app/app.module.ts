import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyMaterialModule } from './MyMaterialModule';

import { AppComponent } from './components/app/app.component';

import { ClienteComponent } from './components/cliente/cliente.component';
import { EstadoCuentaComponent } from './components/estado-cuenta/estado-cuenta.component';
import { PagoComponent } from './components/pago/pago.component';
import { ContratoComponent } from './components/contrato/contrato.component';
import { FacturaComponent } from './components/factura/factura.component';

import { EstadoCuentaService } from './services/estadoCuenta.service';
import { ContratoService } from './services/contrato.service';
import { PagoService } from './services/pago.service';
import { FacturaService } from './services/factura.service';
import { ClienteService } from './services/';

import { routes } from './app.route';
import { DialogoClienteComponent } from './components/dialogos/dialogo-cliente/dialogo-cliente.component';
import { DialogoPagoComponent } from './components/dialogos/dialogo-pago/dialogo-pago.component';
import { DialogoEstadoCuentaComponent } from './components/dialogos/dialogo-estado-cuenta/dialogo-estado-cuenta.component';
import { DialogoContratoComponent } from './components/dialogos/dialogo-contrato/dialogo-contrato.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { DialogoFacturaComponent } from './components/dialogos/dialogo-factura/dialogo-factura.component';


@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    EstadoCuentaComponent,
    PagoComponent,
    ContratoComponent,
    FacturaComponent,
    DialogoClienteComponent,
    DialogoPagoComponent,
    DialogoEstadoCuentaComponent,
    DialogoContratoComponent,
    InicioComponent,
    DialogoFacturaComponent
  ],
  entryComponents: [
    DialogoClienteComponent, DialogoPagoComponent, DialogoEstadoCuentaComponent, DialogoContratoComponent, DialogoFacturaComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true}),
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MyMaterialModule
  ],
  providers: [ClienteService, EstadoCuentaService, ContratoService, PagoService, FacturaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
