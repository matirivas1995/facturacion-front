import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cliente, Contrato, EstadoCuenta, Id, Pago } from '../../../model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogoClienteComponent } from '../dialogo-cliente/dialogo-cliente.component';
import { ClienteService } from '../../../services';
import { VALID } from '@angular/forms/src/model';
import { EstadoCuentaService } from '../../../services/estadoCuenta.service';
import { promise } from 'protractor';
import { PagoService } from '../../../services/pago.service';
import { Financiacion } from '../../../model/financiacion';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-dialogo-contrato',
  templateUrl: './dialogo-contrato.component.html',
  styleUrls: ['./dialogo-contrato.component.css']
})
export class DialogoContratoComponent implements OnInit {

  form: FormGroup;
  contrato: Contrato;
  clientes: Cliente [];
  operation: String;
  clienteseleccionado: Cliente = new Cliente();
  cl: Cliente;
  es: EstadoCuenta;
  estadoId: Id;
  cuotas: number;


  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<DialogoClienteComponent>,
      private clienteService: ClienteService,
      private estadoService: EstadoCuentaService,
      private pagoService: PagoService,
      @Inject(MAT_DIALOG_DATA) data) {
          this.contrato = data.contrato || new Contrato();
          this.operation = data.operation;
          this.clientes = [];
      }

  ngOnInit() {
    this.getClientes();
    this.createForm();
  }

  close() {
      this.dialogRef.close({action: 'close'});
      this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      Options: ['existente'],
      Clientes: [null],
      RazonSocial: [null],
      Ruc: [null],
      Direccion: [null],
      RepresentanteLegal: [null],
      Ci: [null],
      Periodo: [null, Validators.required],
      MontoTotal: [null, Validators.required],
      Cuotas: [null, Validators.required],
      Fecha: [null, Validators.required],
      Contacto: [null, Validators.required],
      Link: [null, Validators.required],
      Cuota1: [null],
      Cuota2: [null],
      Cuota3: [null],
      Cuota4: [null]
    });
  }

  getClientes() {
    this.clienteService.getClientes()
          .then(clientes => {
            console.log(clientes);
            this.clientes = clientes;
          });
  }

  save() {
      this.contrato.cliente = this.generarCliente();
      this.contrato.estado = this.generarEstado();
      console.log( 'Crear pago de -- ' + this.contrato.estado.id);
      this.contrato.periodo  = this.form.value.Periodo;
      this.contrato.montoTotal = this.form.value.MontoTotal;
      this.contrato.cuotas = this.form.value.Cuotas;
      this.contrato.fecha = this.form.value.Fecha;
      this.contrato.contacto = this.form.value.Contacto;
      this.contrato.link = this.form.value.Link;
      while (this.contrato.estado === null) {

      }
      // this.crearPago(this.contrato.estado);
      this.dialogRef.close({action: 'save',
                            contrato: this.contrato});
  }

  generarCliente(): Cliente  {
    this.cl = new Cliente();
    this.cl = this.form.value.Options === 'existente' ? this.clienteseleccionado : this.asignar();
    return this.cl as Cliente;
  }

  asignar(): Cliente {
    // tslint:disable-next-line:prefer-const
    let c = new Cliente();
    c.razonSocial = this.form.value.RazonSocial;
    c.ruc = this.form.value.Ruc;
    c.direccion = this.form.value.Direccion;
    c.representanteLegal = this.form.value.RepresentanteLegal;
    c.ci = this.form.value.Ci;
    this.clienteService.create(c).then( id => {
      console.log('Cliente creado con id -->  ' + id.id);
      c.id = id.id;
    });
    return c;
  }
  generarEstado(): EstadoCuenta {
    const es = new EstadoCuenta();
    es.cuotasTotales = this.form.value.Cuotas;
    es.cuotasPagadas = 0;
    es.montoTotal = this.form.value.MontoTotal;
    es.pagado = 0;
    es.saldo = es.montoTotal - es.pagado;
    this.estadoService.create(es).then( Iden => {
      console.log('Cliente creado con id -->  ' + Iden.id);
      es.id = Iden.id;
      console.log('epepe - ' + es.id);
      this.crearPago(es);
    });
    return es;
  }

  crearPago(cuenta: EstadoCuenta) {
    this.cuotas = this.form.value.Cuotas;
    console.log('tiene ' + this.cuotas + ' cuotass jejejeje')
    // tslint:disable-next-line:prefer-const
    let pa = new Pago();
    if (this.cuotas == 1) {
      pa.estado = 'Pendiente';
      pa.monto = this.form.value.MontoTotal;
      pa.porcentaje = 100;
      pa.estadoCuenta = cuenta;
      this.pagoService.create(pa);
    }
    if (this.cuotas == 2) {
      for (let i = 0; i < 2; i++) {
        pa.estado = 'Pendiente';
        pa.porcentaje = i === 0 ? this.form.value.Cuota1 : this.form.value.Cuota2;
        pa.monto = this.form.value.MontoTotal * (pa.porcentaje / 100);
        pa.estadoCuenta = cuenta;
        this.pagoService.create(pa);
      }
    }
    if (this.cuotas > 2 && this.cuotas < 5) {
      for (let j = 0; j < this.cuotas; j++) {
        pa.estado = 'Pendiente';
        if (j === 0) {
          pa.porcentaje = this.form.value.Cuota1;
          pa.monto = this.form.value.MontoTotal * (pa.porcentaje / 100);
        }
        if (j === 1) {
          pa.porcentaje = this.form.value.Cuota2;
          pa.monto = this.form.value.MontoTotal * (pa.porcentaje / 100);
        }
        if (j === 2) {
          pa.porcentaje = this.form.value.Cuota3;
          pa.monto = this.form.value.MontoTotal * (pa.porcentaje / 100);
        }
        if (j === 3) {
          pa.porcentaje = this.form.value.Cuota4;
          pa.monto = this.form.value.MontoTotal * (pa.porcentaje / 100);
        }
        pa.estadoCuenta = cuenta;
        this.pagoService.create(pa);
      }
    }
    if (this.cuotas > 4) {
      let fina = new Financiacion;
      fina = this.porcentaje(this.cuotas , this.form.value.MontoTotal);
      for (let k = 0; k < this.cuotas; k++) {
        pa.estado = 'Pendiente';
        pa.monto = fina.monto;
        pa.porcentaje = fina.porcentaje;
        pa.estadoCuenta = cuenta;
        this.pagoService.create(pa);
      }
    }
  }
  porcentaje(cuotas: number , total: number): Financiacion {
    // tslint:disable-next-line:prefer-const
    let fina = new Financiacion;
    fina.monto = total / cuotas;
    fina.porcentaje = (fina.monto / total) * 100;
    return fina;
  }

}
