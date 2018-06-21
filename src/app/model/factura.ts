import { Contrato } from './contrato';

export class Factura {
    id: number;
    nroFactura: number;
    contrato: Contrato;
    montoTotal: number;
    gravada10: number;
    gravada5: number;
    iva10: number;
    iva5: number;
    exenta: number;
    descripcio: string;
    fecha: Date;
    estado: string;
}
