import { PacienteService } from './../../_service/paciente.service';
import { Paciente } from 'src/app/_model/paciente';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {
  
  cantidad:number;
  dataSource:MatTableDataSource<Paciente>;
  displayedColumns = ['idPaciente','nombres','apellidos','acciones'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort:MatSort; 
   

  constructor(private pacienteService:PacienteService, private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.pacienteService.pacienteCambio.subscribe(data=>{
      this.dataSource=new MatTableDataSource(data); 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });

    this.pacienteService.mensajeCambio.subscribe(data=>{
      this.snackBar.open(data, 'AVISO',{
        duration:2000
      });
    });

/*
    this.pacienteService.listar().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data); 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });*/

    this.pacienteService.listarPageable(0,10 ).subscribe(data=>{
      let pacientes =JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;
      this.dataSource=new MatTableDataSource(pacientes); 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  eliminar(idPaciente : number){
    this.pacienteService.eliminar(idPaciente).subscribe(data=>{
      this.pacienteService.listar().subscribe(data=>{
        this.pacienteService.pacienteCambio.next(data);
        this.pacienteService.mensajeCambio.next('Se eliminó');
      });
    });
  }

  mostrarMas(e:any){
    //console.log(e);
    this.pacienteService.listarPageable(e.pageIndex, e.pageSize).subscribe(
      data=>{
        //Se transforma en un string luego se parse en un JSON luego se toma el valor que 
        //se necesite
      let pacientes =JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;
      this.dataSource=new MatTableDataSource(pacientes); 
      //this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      }

    );
  }
  
  applyFilter(filterValue: string){
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter=filterValue;
  }
  
}
