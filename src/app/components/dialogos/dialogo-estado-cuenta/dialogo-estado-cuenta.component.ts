import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstadoCuenta, Pago } from '../../../model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PagoService } from '../../../services/pago.service';

@Component({
  selector: 'app-dialogo-estado-cuenta',
  templateUrl: './dialogo-estado-cuenta.component.html',
  styleUrls: ['./dialogo-estado-cuenta.component.css']
})
export class DialogoEstadoCuentaComponent implements OnInit {

  form: FormGroup;
  estado: EstadoCuenta;
  operation: String;
  pagos: Pago [];
  pagoseleccionado: Pago = new Pago();
  cuo: Number;
  sal: Number;
  today = new Date();
  hoy = new Date();
  selec: Pago;

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<DialogoEstadoCuentaComponent>,
      private pagoService: PagoService,
      @Inject(MAT_DIALOG_DATA) data) {
          this.estado = data.estado || new EstadoCuenta();
          this.operation = data.operation;
      }

  ngOnInit() {
      this.getDateToday();
      this.pagoService.getFilterByEstado(this.estado)
      .then(pagos => {
        console.log(pagos);
        this.pagos = pagos;
      });
      this.cuo = this.estado.cuotasTotales - this.estado.cuotasPagadas;
      this.sal = this.estado.saldo;
      this.form = this.fb.group({
          Pagos: [null]
      });

  }

  close() {
      this.dialogRef.close({action: 'close'});
  }

  save() {
      this.selec.estado = 'Pagado';
      this.selec.fecha = this.hoy;
      console.log(this.selec);
      this.pagoService.update(this.selec);
      this.dialogRef.close({action: 'save',
                            cliente: this.estado});
  }

    delete() {
        this.dialogRef.close({action: 'delete',
                              cliente: this.estado});
    }

    getDateToday() {
        const dd: number = this.today.getDate();
        const mm: number = this.today.getMonth();
        const yy: number = this.today.getFullYear();
        this.hoy = new Date(yy , mm , dd);
      }

}
