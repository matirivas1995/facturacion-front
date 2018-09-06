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
  today = new Date();
  todayStr: String;
  estados = [
    {value: 'Pendiente', viewValue: 'Pendiente'},
    {value: 'Pagado', viewValue: 'Pagado'}
  ];
  selec: string;

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<DialogoPagoComponent>,
      @Inject(MAT_DIALOG_DATA) data) {
          this.pago = data.pago || new Pago();
          this.operation = data.operation;
      }

  ngOnInit() {
      this.getDateToday();
      this.form = this.fb.group({
          Monto: [this.pago.monto, Validators.required],
          Fecha: [this.todayStr],
          Porcentaje: [this.pago.porcentaje, Validators.required],
          Estado: [this.estados, Validators.required]
      });
  }

  close() {
      this.dialogRef.close({action: 'close'});
  }

  save() {
      this.pago.monto = this.form.value.Monto;
      this.pago.fecha = new Date(this.form.value.Fecha);
      this.pago.porcentaje = this.form.value.Porcentaje;
      this.pago.estado = this.form.value.Estado;
      console.log(this.pago);
      this.dialogRef.close({action: 'save',
                            pago: this.pago});
  }

    delete() {
        this.dialogRef.close({action: 'delete',
                              pago: this.pago});
    }

    getDateToday() {
        const dd: number = this.today.getDate();
        const mm: number = this.today.getMonth() + 1;
        const yy: number = this.today.getFullYear();
        this.todayStr = dd + '/' + mm + '/' + yy;
      }


}
