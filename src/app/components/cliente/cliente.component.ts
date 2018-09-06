import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../model';
import { ClienteService } from '../../services';
import { MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import { DialogoClienteComponent } from '../dialogos/dialogo-cliente/dialogo-cliente.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  clientes: Cliente[];
  clienteSeleccionado: Cliente;
  columnsToDisplay = ['id', 'razonSocial', 'ruc', 'direccion',
  'representanteLegal', 'ci'];

  constructor(private clienteService: ClienteService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getClientes();
  }

  getClientes() {
    this.clienteService.getClientes()
      .then(clientes => {
        console.log(clientes);
        this.clientes = clientes;
      });
  }

  crear() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = false;
      dialogConfig.width = '500px';
      dialogConfig.data = new Cliente();

      const dialogRef = this.dialog.open(DialogoClienteComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(
        data => {
          if (data.action === 'save') {
            console.log('Creando ', data);
            this.clienteService.create(data.cliente)
            .then((response) => {
              if (response.id) {
                console.log('Cliente ' + response.id + ' creado');
                this.snackBar.open('Creado exitosamente', '', {duration: 2000});
                console.log('Recargando clientes');
                this.getClientes();
              } else {
                console.log('Cliente no pudo ser creado');
                console.log(response);
                this.snackBar.open('Se produjo un error. Verifique console log', '', {duration: 2000});
              }
            });
          } else {
            console.log(data);
          }
        }
      );
  }

  seleccionar(cliente: Cliente) {
      this.clienteSeleccionado = cliente;

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = false;
      dialogConfig.width = '400px';
      dialogConfig.data = {operation: 'modify',
                          cliente: this.clienteSeleccionado
                          };

      const dialogRef = this.dialog.open(DialogoClienteComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(
        data => {
          if (data.action === 'save') {
            console.log(data.cliente);
            this.clienteService.update(data.cliente)
              .then((response) => {
                if (response.ok) {
                  console.log('Cliente ' + data.cliente.id + ' modificado');
                  this.snackBar.open('Cliente modificado', '', {duration: 2000});
                  console.log('Recargando clientes');
                  this.getClientes();
                } else {
                  console.log('Cliente ' + data.cliente.id + ' no pudo ser modificado');
                  this.snackBar.open('Error al modificar cliente', '', {duration: 2000});
                }
                  });
              } else if (data.action === 'delete') {
                this.delete(data.cliente);
              } else {
                console.log(data);
              }
            }
          );
    }


    delete(cliente: Cliente) {

        this.clienteService.delete(cliente)
        .then((response) => {
          if (response.ok) {
            console.log('Cliente ' + cliente.id + ' eliminado');
            this.snackBar.open('Cliente eliminado', '', {duration: 2000});
            console.log('Recargando clientes');
            this.getClientes();
          } else {
            console.log('Cliente ' + cliente.id + ' no pudo ser eliminado');
            this.snackBar.open('Error al eliminar cliente', '', {duration: 2000});
          }
        });
    }

}
