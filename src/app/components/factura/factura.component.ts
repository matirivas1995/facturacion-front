import { Component, OnInit } from '@angular/core';
import { Factura } from '../../model';
import { FacturaService } from '../../services/factura.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {
  facturas: Factura[];
  columnsToDisplay = ['id', 'nroFactura', 'contrato',  'montoTotal', 'descripcion', 'fecha'];

  constructor(private facturaService: FacturaService) { }

  ngOnInit() {
    this.getFacturas();
  }

  getFacturas() {
    this.facturaService.getFacturas()
      .then(facturas => {
        console.log(facturas);
        this.facturas = facturas;
      });
  }

}
