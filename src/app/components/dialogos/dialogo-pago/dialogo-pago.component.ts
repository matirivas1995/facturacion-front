import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pago } from '../../../model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EstadoCuentaService } from '../../../services/estadoCuenta.service';

@Component({
  selector: 'app-dialogo-pago',
  templateUrl: './dialogo-pago.component.html',
  styleUrls: ['./dialogo-pago.component.css']
})
export class DialogoPagoComponent implements OnInit {

  form: FormGroup;
  pago: Pago;
  operation: String;

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<DialogoPagoComponent>,
      @Inject(MAT_DIALOG_DATA) data) {
          this.pago = data.pago || new Pago();
          this.operation = data.operation;
      }

  ngOnInit() {
      this.form = this.fb.group({
          Monto: [this.pago.monto, Validators.required],
          Fecha: [this.pago.fecha],
          Porcentaje: [this.pago.porcentaje, Validators.required],
          Estado: [this.pago.estado, Validators.required]
      });
  }

  close() {
      this.dialogRef.close({action: 'close'});
  }

  save() {
      this.pago.monto = this.form.value.Monto;
      this.pago.fecha = this.form.value.Fecha;
      this.pago.porcentaje = this.form.value.Porcentaje;
      this.pago.estado = this.form.value.Estado;

      this.dialogRef.close({action: 'save',
                            cliente: this.pago});
  }

    delete() {
        this.dialogRef.close({action: 'delete',
                              cliente: this.pago});
    }


}
