import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cliente } from '../../../model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialogo-cliente',
  templateUrl: './dialogo-cliente.component.html',
  styleUrls: ['./dialogo-cliente.component.css']
})
export class DialogoClienteComponent implements OnInit {

  form: FormGroup;
  cliente: Cliente;
  operation: String;

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<DialogoClienteComponent>,
      @Inject(MAT_DIALOG_DATA) data) {
          this.cliente = data.cliente || new Cliente();
          this.operation = data.operation;
      }

  ngOnInit() {
      this.form = this.fb.group({
          RazonSocial: [this.cliente.razonSocial, Validators.required],
          Ruc: [this.cliente.ruc, Validators.required],
          Direccion: [this.cliente.direccion, Validators.required],
          RepresentanteLegal: [this.cliente.representanteLegal, Validators.required],
          Ci: [this.cliente.ci, Validators.required]
      });
  }

  close() {
      this.dialogRef.close({action: 'close'});
  }

  save() {
      this.cliente.razonSocial = this.form.value.RazonSocial;
      this.cliente.ruc = this.form.value.Ruc;
      this.cliente.direccion = this.form.value.Direccion;
      this.cliente.representanteLegal = this.form.value.RepresentanteLegal;
      this.cliente.ci = this.form.value.Ci;

      this.dialogRef.close({action: 'save',
                            cliente: this.cliente});
  }

    delete() {
        this.dialogRef.close({action: 'delete',
                              cliente: this.cliente});
    }


}
