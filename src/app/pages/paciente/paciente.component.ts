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

    this.pacienteService.listar().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data); 
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
  
}
