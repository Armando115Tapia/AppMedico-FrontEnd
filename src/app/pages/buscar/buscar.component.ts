import { ConsultaService } from './../../_service/consulta.service';
import { Consulta } from './../../_model/consulta';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { FiltroConsulta } from 'src/app/_model/filtroConsulta';
import { DialogoDetalleComponent } from './dialogo-detalle/dialogo-detalle.component';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  form: FormGroup;
  //Nombre de las columnas
  displayedColumns = ['paciente', 'medico', 'especialidad', 'fecha', 'acciones'];
  dataSource: MatTableDataSource<Consulta>;
  //Paginadores y orndenamiento de angular material
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  maxFecha: Date = new Date();

  constructor(private consultaService: ConsultaService, public dialog: MatDialog) { }

  ngOnInit() {
    this.form = new FormGroup({
      'dni': new FormControl(''),
      'nombreCompleto': new FormControl(''),
      'fechaConsulta': new FormControl()
    });
  }

  buscar() {
    //Se crea un objeto de filtro consulta(modelo) que contiene lo que se escribio en los inputs
    let filtro = new FiltroConsulta(this.form.value['dni'], this.form.value['nombreCompleto'], this.form.value['fechaConsulta']);
    filtro.nombreCompleto = filtro.nombreCompleto.toLocaleLowerCase();

    if (filtro.fechaConsulta) {
      filtro.fechaConsulta.setHours(0);
      filtro.fechaConsulta.setMinutes(0);
      filtro.fechaConsulta.setSeconds(0);
      filtro.fechaConsulta.setMilliseconds(0);

      //Esta es una palabra reservada cuando se trabaja con JSON, elimina el campo seleccionado
      delete filtro.dni;
      delete filtro.nombreCompleto;

      console.log(filtro);

      this.consultaService.buscar(filtro).subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
      });
    } else {
      delete filtro.fechaConsulta;

      if (filtro.dni.length === 0) {
        delete filtro.dni;
      }

      if (filtro.nombreCompleto.length === 0) {
        delete filtro.nombreCompleto
      }

      console.log(filtro);

      this.consultaService.buscar(filtro).subscribe(data => {
        this.dataSource = new MatTableDataSource(data)
      });
    }
  }

  //Se retorna una consulta
  verDetalle(consulta: Consulta) {
    console.log(consulta);
    this.dialog.open(DialogoDetalleComponent, {      
       data: consulta
    });
  }

}
