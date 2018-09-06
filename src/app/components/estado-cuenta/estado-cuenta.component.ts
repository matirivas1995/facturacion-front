import { Component, OnInit } from '@angular/core';
import { EstadoCuenta, Pago, Contrato } from '../../model';
import { EstadoCuentaService } from '../../services/estadoCuenta.service';
import { MatDialogConfig, MatSnackBar, MatDialog } from '@angular/material';
import { DialogoEstadoCuentaComponent } from '../dialogos/dialogo-estado-cuenta/dialogo-estado-cuenta.component';
import { PagoService } from '../../services/pago.service';
import { ContratoService } from '../../services/contrato.service';

@Component({
  selector: 'app-estado-cuenta',
  templateUrl: './estado-cuenta.component.html',
  styleUrls: ['./estado-cuenta.component.css']
})
export class EstadoCuentaComponent implements OnInit {

  Arr = Array;
  estados: EstadoCuenta[];
  contratos: Contrato[];
  estadoId: EstadoCuenta;
  estadoSeleccionado: EstadoCuenta;
  columnsToDisplay = ['razonSocial', 'cuotasTotales', 'montoTotal',
  'pagado', 'saldo'];

  constructor(private estadoCuentaService: EstadoCuentaService,
              private contratoService: ContratoService,
              private pagoService: PagoService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getContratos();
  }

  getContratos() {
    this.contratoService.getFilterByPeriodo(2018)
    .then(contras => {
      this.contratos = contras;
      console.log(contras);
    });
  }

  seleccionar(contrato: Contrato) {
    this.estadoSeleccionado = contrato.estado;
    console.log(this.estadoSeleccionado);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '400px';
    dialogConfig.data = {operation: 'modify',
                        estado: this.estadoSeleccionado
                        };

    const dialogRef = this.dialog.open(DialogoEstadoCuentaComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.action === 'save') {
          this.getContratos();
        } else {
          console.log(data);
        }
      });
  }


  delete(contrato: Contrato) {
      this.estadoCuentaService.delete(contrato.estado)
      .then((response) => {
        if (response.ok) {
          console.log('Estado ' + contrato.estado.id + ' eliminado');
          this.snackBar.open('Estado eliminado', '', {duration: 2000});
          console.log('Recargando Estados de Cuenta');
          this.getContratos();
        } else {
          console.log('Estado ' + contrato.estado.id + ' no pudo ser eliminado');
          this.snackBar.open('Error al eliminar estado de cuenta', '', {duration: 2000});
        }
      });
  }
}
