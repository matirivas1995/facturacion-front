import { Component, OnInit } from '@angular/core';
import { Pago } from '../../model';
import { PagoService } from '../../services/pago.service';
import { MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import { DialogoPagoComponent } from '../dialogos/dialogo-pago/dialogo-pago.component';


@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  pagos: Pago[];
  pagoSeleccionado: Pago;
  columnsToDisplay = ['id', 'estadoCuenta', 'monto', 'porcentaje', 'fecha', 'estado'];

  constructor(private pagoService: PagoService,
                public dialog: MatDialog,
                private snackBar: MatSnackBar) { }

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

    seleccionar(pago: Pago) {
        this.pagoSeleccionado = pago;
        console.log(this.pagoSeleccionado);

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = false;
        dialogConfig.width = '400px';
        dialogConfig.data = {operation: 'modify',
                            pago: this.pagoSeleccionado
                            };

        const dialogRef = this.dialog.open(DialogoPagoComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(
          data => {
            if (data.action === 'save') {
              console.log(data.pago);
              this.pagoService.update(data.pago)
                .then((response) => {
                  if (response.ok) {
                    console.log('Pago ' + data.pago.id + ' modificado');
                    this.snackBar.open('Pago modificado', '', {duration: 2000});
                    console.log('Recargando Pagos');
                    this.getPagos();
                  } else {
                    console.log('Pago ' + data.pago.id + ' no pudo ser modificado');
                    this.snackBar.open('Error al modificar pago', '', {duration: 2000});
                  }
                    });
                } else if (data.action === 'delete') {
                  this.delete(data.pago);
                } else {
                  console.log(data);
                }
              }
            );
      }


      delete(pago: Pago) {

          this.pagoService.delete(pago)
          .then((response) => {
            if (response.ok) {
              console.log('Pago ' + pago.id + ' eliminado');
              this.snackBar.open('Pago eliminado', '', {duration: 2000});
              console.log('Recargando pagos');
              this.getPagos();
            } else {
              console.log('Pago ' + pago.id + ' no pudo ser eliminado');
              this.snackBar.open('Error al eliminar pago', '', {duration: 2000});
            }
          });
      }


}
