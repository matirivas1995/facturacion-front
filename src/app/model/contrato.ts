import { Cliente } from './cliente';
import { EstadoCuenta } from './estadoCuenta';

export class Contrato {
    id: number;
    periodo: number;
    montoTotal: number;
    cuotas: number;
    estado: EstadoCuenta;
    cliente: Cliente;
    fecha: Date;
    contacto: string;
    link: string;
}
