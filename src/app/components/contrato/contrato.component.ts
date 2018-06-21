import { Component, OnInit } from '@angular/core';
import { Contrato } from '../../model';
import { ContratoService } from '../../services/contrato.service';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.css']
})
export class ContratoComponent implements OnInit {
  contratos: Contrato[];
  columnsToDisplay = ['id', 'cliente', 'periodo', 'montoTotal', 'cuotas', 'estado', 'fecha', 'Contacto', 'link'];

  constructor(private contratoService: ContratoService) { }

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
}
