import { EstadoCuenta } from './estadoCuenta';

export class Pago {
    id: number;
    estadoCuenta: EstadoCuenta;
    monto: number;
    porcentaje: number;
    fecha: Date;
    estado: string;
}
