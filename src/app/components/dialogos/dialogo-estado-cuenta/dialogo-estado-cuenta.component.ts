import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstadoCuenta } from '../../../model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialogo-estado-cuenta',
  templateUrl: './dialogo-estado-cuenta.component.html',
  styleUrls: ['./dialogo-estado-cuenta.component.css']
})
export class DialogoEstadoCuentaComponent implements OnInit {

  form: FormGroup;
  estado: EstadoCuenta;
  operation: String;

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<DialogoEstadoCuentaComponent>,
      @Inject(MAT_DIALOG_DATA) data) {
          this.estado = data.estado || new EstadoCuenta();
          this.operation = data.operation;
      }

  ngOnInit() {
      this.form = this.fb.group({
          CuotasTotales: [this.estado.cuotasTotales, Validators.required],
          MontoTotal: [this.estado.montoTotal, Validators.required]
      });

  }

  close() {
      this.dialogRef.close({action: 'close'});
  }

  save() {
      this.estado.cuotasTotales = this.form.value.CuotasTotales;
      this.estado.montoTotal = this.form.value.MontoTotal;
      this.dialogRef.close({action: 'save',
                            cliente: this.estado});
  }

    delete() {
        this.dialogRef.close({action: 'delete',
                              cliente: this.estado});
    }

}
