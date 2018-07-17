import { Component, OnInit } from '@angular/core';
import { Contrato } from '../../model';
import { ContratoService } from '../../services/contrato.service';
import { MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import { DialogoClienteComponent } from '../dialogos/dialogo-cliente/dialogo-cliente.component';
import { DialogoContratoComponent } from '../dialogos/dialogo-contrato/dialogo-contrato.component';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.css']
})
export class ContratoComponent implements OnInit {
  contratos: Contrato[];
  columnsToDisplay = ['id', 'cliente', 'periodo', 'montoTotal', 'cuotas', 'estado', 'fecha', 'Contacto', 'link'];

  constructor(private contratoService: ContratoService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getContratos();
  }

  getContratos() {
    this.contratoService.getContratos()
      .then(contratos => {
        console.log(contratos);
        this.contratos = contratos;
      });
  }


  crear() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '400px';
    dialogConfig.data = new Contrato();

    const dialogRef = this.dialog.open(DialogoContratoComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data.action === 'save') {
          console.log('Creando ', data);
          this.contratoService.create(data.contrato)
          .then((response) => {
            if (response.ok) {
              console.log('Contrato ' + data.contrato.id + ' creado');
              this.snackBar.open('Creado exitosamente', '', {duration: 2000});
              console.log('Recargando Contratos');
              this.getContratos();
            } else {
              console.log('Contrato no pudo ser creado');
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
}
