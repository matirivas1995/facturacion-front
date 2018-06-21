import { Component, OnInit } from '@angular/core';
import { EstadoCuenta } from '../../model';
import { EstadoCuentaService } from '../../services/estadoCuenta.service';

@Component({
  selector: 'app-estado-cuenta',
  templateUrl: './estado-cuenta.component.html',
  styleUrls: ['./estado-cuenta.component.css']
})
export class EstadoCuentaComponent implements OnInit {

  estados: EstadoCuenta[];
  columnsToDisplay = ['id', 'cuotasTotales', 'cuotasPagadas', 'montoTotal',
  'pagado', 'saldo'];

  constructor(private estadoCuentaService: EstadoCuentaService) { }

  ngOnInit() {
    this.getEstados();
  }

  getEstados() {
    this.estadoCuentaService.getEstadoCuentas()
      .then(estados => {
        console.log(estados);
        this.estados = estados;
      });
  }
}
