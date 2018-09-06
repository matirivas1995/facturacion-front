import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Contrato, Cliente, Factura, Pago } from '../../../model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogoClienteComponent } from '../dialogo-cliente/dialogo-cliente.component';
import { ClienteService } from '../../../services';
import { EstadoCuentaService } from '../../../services/estadoCuenta.service';
import { PagoService } from '../../../services/pago.service';
import { ContratoService } from '../../../services/contrato.service';

import * as jspdf from 'jspdf';

@Component({
  selector: 'app-dialogo-factura',
  templateUrl: './dialogo-factura.component.html',
  styleUrls: ['./dialogo-factura.component.css']
})
export class DialogoFacturaComponent implements OnInit {


  form: FormGroup;
  operation: String;
  contrato: Contrato;
  factura: Factura;
  clientes: Cliente [];
  pagos: Pago [];
  estado: number;
  clienteseleccionado: Cliente = new Cliente();
  razon: String;
  pagoseleccionado: Pago = new Pago();
  selec: Pago [];
  descri: String;
  today = new Date();
  todayStr: String;
  ultimaFact: String;
  perio: String;
  montoTotal: number = null;
  iva10: number;

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<DialogoClienteComponent>,
      private clienteService: ClienteService,
      private contratoService: ContratoService,
      private pagoService: PagoService,
      @Inject(MAT_DIALOG_DATA) data) {
          this.factura = data.factura || new Factura();
          this.operation = data.operation;
          this.clientes = [];
          this.pagos = [];
      }

  ngOnInit() {
    this.getClientes();
    this.getDateToday();
    this.getDatos();
    this.createForm();
  }

  getClientes() {
    this.clienteService.getClientes()
          .then(clientes => {
            console.log(clientes);
            this.clientes = clientes;
          });
  }

  createForm() {
    this.form = this.fb.group({
      Fecha: [this.todayStr],
      Factura: [this.ultimaFact],
      Periodo: [this.perio],
      Clientes: [null],
      Pagos: [null],
      Descripcion: [this.descri]
    });
  }
  getContrato() {
    this.contratoService.getFilterByCliente(this.clienteseleccionado, this.form.value.Periodo)
    .then(contrato => {
      console.log(contrato);
      this.contrato = contrato;
      this.razon = this.contrato.cliente.razonSocial;
      this.form.value.Estado = this.contrato.estado.id;
      console.log('este es el estado ' + this.form.value.Estado);
      this.pagoService.getFilterByEstado(this.contrato.estado)
      .then(pagos => {
        console.log('papapapapapagoos --> ');
        console.log(pagos);
        this.pagos = pagos;
      });
    });
  }

  calcular () {
    this.montoTotal = 0 ;
    for ( let i = 0 ; i < this.selec.length; i++) {
      let pa = new Pago();
      pa = this.selec[i];
      console.log('este es el monto actual ' + pa.monto);
      console.log('esta es la sumatoria ' + this.montoTotal);
      this.montoTotal = pa.monto + this.montoTotal;
    }
    this.iva10 = Math.trunc(this.montoTotal / 11);
  }

  getDateToday() {
    const dd: number = this.today.getDate();
    const mm: number = this.today.getMonth() + 1;
    const yy: number = this.today.getFullYear();

    this.todayStr = dd + '/' + mm + '/' + yy;
  }
  getDatos() {
    this.ultimaFact = '001-001-0000001';
    this.perio = '2018';
    this.descri = 'Honorarios Profesionales \nAuditoria Impositiva s/ contrato  Año ' + this.perio;
  }
  close() {
      this.dialogRef.close({action: 'close'});
  }
  print() {
    const doc = new jspdf('p', 'mm', 'a4');
    doc.setFontSize(11);
    doc.setFont('calibri');
    doc.text(this.todayStr, 48, 51);
    doc.text(this.contrato.cliente.ruc, 45, 58);
    doc.text(this.contrato.cliente.razonSocial, 45, 63);
    doc.text('x', 148, 51);
    doc.text(this.descri, 38, 84);
    doc.text(this.montoTotal.toLocaleString('es'), 173, 84);
    doc.text(this.montoTotal.toLocaleString('es'), 173, 169);
    doc.text(this.montoTotal.toLocaleString('es'), 173, 176);
    doc.text('diez millones de guaranies', 45, 176);
    doc.text(this.iva10.toLocaleString('es'), 102 , 188);
    doc.text(this.iva10.toLocaleString('es'), 140, 188);
    doc.autoPrint();
    doc.save(this.ultimaFact + '.pdf');
  }

  save(){}

}
