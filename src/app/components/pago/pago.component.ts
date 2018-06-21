import { Component, OnInit } from '@angular/core';
import { Pago } from '../../model';
import { PagoService } from '../../services/pago.service';


@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  pagos: Pago[];
  columnsToDisplay = ['id', 'estadoCuenta', 'monto', 'porcentaje', 'fecha', 'estado'];

  constructor(private pagoService: PagoService) { }

  ngOnInit() {
    this.getPagos();
  }

  getPagos() {
    this.pagoService.getPagos()
      .then(pagos => {
        console.log(pagos);
        this.pagos = pagos;
      });
  }
}
