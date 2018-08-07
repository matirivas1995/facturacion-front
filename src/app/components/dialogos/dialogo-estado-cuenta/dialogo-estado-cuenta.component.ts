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


  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<DialogoEstadoCuentaComponent>,
      private pagoService: PagoService,
      @Inject(MAT_DIALOG_DATA) data) {
          this.estado = data.estado || new EstadoCuenta();
          this.operation = data.operation;
      }

  ngOnInit() {
      this.pagoService.getFilterByEstado(this.estado)
      .then(pagos => {
        console.log(pagos);
        this.pagos = pagos;
      });
      this.form = this.fb.group({
          CuotasPendientes: [this.estado.cuotasTotales - this.estado.cuotasPagadas, Validators.required],
          Saldo: [this.estado.saldo, Validators.required],
          Pagos: [null]
      });

  }

  close() {
      this.dialogRef.close({action: 'close'});
  }

  save() {
      this.dialogRef.close({action: 'save',
                            cliente: this.estado});
  }

    delete() {
        this.dialogRef.close({action: 'delete',
                              cliente: this.estado});
    }

}
