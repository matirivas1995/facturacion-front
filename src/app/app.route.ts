
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from './components/cliente/cliente.component';
import { EstadoCuentaComponent } from './components/estado-cuenta/estado-cuenta.component';
import { PagoComponent } from './components/pago/pago.component';
import { ContratoComponent } from './components/contrato/contrato.component';
import { FacturaComponent } from './components/factura/factura.component';

export const routes: Routes = [
     {
        path: '',
        redirectTo: '/clientes',
        pathMatch: 'full'
    },
    {
        path: 'clientes',
        component: ClienteComponent,
    },
    {
        path: 'estados',
        component: EstadoCuentaComponent,
    },
    {
        path: 'pagos',
        component: PagoComponent,
    },
    {
        path: 'contratos',
        component: ContratoComponent,
    },
    {
        path: 'facturas',
        component: FacturaComponent,
    }


];
