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
    this.getEstados();
    this.getContratos();
  }

  getEstados() {
    this.estadoCuentaService.getEstadoCuentas()
      .then(estados => {
        this.estados = estados;
        console.log(estados);
      });
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
          this.estadoCuentaService.update(data.estado)
            .then((response) => {
              if (response.ok) {
                console.log('Estado ' + data.estado.id + ' modificado');
                this.snackBar.open('Estado modificado', '', {duration: 2000});
                console.log('Recargando Pagos');
                this.getEstados();
              } else {
                console.log('Estado ' + data.estado.id + ' no pudo ser modificado');
                this.snackBar.open('Error al modificar Estado de cuenta', '', {duration: 2000});
              }
                });
            } else if (data.action === 'delete') {
              this.delete(data.estado);
            } else {
              console.log(data);
            }
          }
        );
  }


  delete(estado: EstadoCuenta) {
      this.estadoCuentaService.delete(estado)
      .then((response) => {
        if (response.ok) {
          console.log('Estado ' + estado.id + ' eliminado');
          this.snackBar.open('Estado eliminado', '', {duration: 2000});
          console.log('Recargando Estados de Cuenta');
          this.getEstados();
        } else {
          console.log('Estado ' + estado.id + ' no pudo ser eliminado');
          this.snackBar.open('Error al eliminar estado de cuenta', '', {duration: 2000});
        }
      });
  }
}
