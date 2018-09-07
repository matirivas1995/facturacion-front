import { Component, OnInit } from '@angular/core';
import { Contrato } from '../../model';
import { ContratoService } from '../../services/contrato.service';
import { MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import { DialogoClienteComponent } from '../dialogos/dialogo-cliente/dialogo-cliente.component';
import { DialogoContratoComponent } from '../dialogos/dialogo-contrato/dialogo-contrato.component';
import { AppComponent } from '../app/app.component';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.css']
})
export class ContratoComponent implements OnInit {
  contratos: Contrato[];
  columnsToDisplay = [ 'cliente', 'periodo', 'montoTotal', 'cuotas', 'fecha'];
  title: AppComponent;
  chips: any;
  year: any;

  constructor(private contratoService: ContratoService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.year = 2018;
    this.getContratos();
    this.chips = ['2016' , '2017' , '2018' , '2019'];
    console.log(this.year);
  }

  getContratos() {
    this.contratoService.getFilterByPeriodo(this.year)
      .then(contratos => {
        console.log(contratos);
        this.contratos = contratos;
      });
  }

  onRowClicked(year: any) {
    this.year = year;
    this.getContratos();
  }


  crear() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '500px';
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
