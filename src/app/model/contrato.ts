import { Cliente } from '.';
import { EstadoCuenta } from './estadoCuenta';

export class Contrato {
    id: number;
    cliente: Cliente;
    periodo: number;
    montoTotal: number;
    cuotas: number;
    estado: EstadoCuenta;
    fecha: Date;
    contacto: string;
    link: string;
}
