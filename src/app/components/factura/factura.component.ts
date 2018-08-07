import { Component, OnInit } from '@angular/core';
import { Factura } from '../../model';
import { FacturaService } from '../../services/factura.service';
import { MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import { DialogoFacturaComponent } from '../dialogos/dialogo-factura/dialogo-factura.component';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {
  facturas: Factura[];
  columnsToDisplay = ['id', 'nroFactura', 'contrato',  'montoTotal', 'descripcion', 'fecha'];

  constructor(private facturaService: FacturaService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getFacturas();
  }

  getFacturas() {
    this.facturaService.getFacturas()
      .then(facturas => {
        console.log(facturas);
        this.facturas = facturas;
      });
  }

  crear() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '500px';
    dialogConfig.data = new Factura();

    const dialogRef = this.dialog.open(DialogoFacturaComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data.action === 'save') {
          console.log('Creando ', data);
          this.facturaService.create(data.factura)
          .then((response) => {
            if (response.ok) {
              console.log('Factura ' + data.factura.id + ' creada');
              this.snackBar.open('Creada exitosamente', '', {duration: 2000});
              console.log('Recargando Contratos');
              this.getFacturas();
            } else {
              console.log('Factura no pudo ser creado');
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
