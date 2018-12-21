import { DialogoComponent } from './dialogo/dialogo.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { Medico } from 'src/app/_model/medico';
import { MedicoService } from 'src/app/_service/medico.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {
  displayedColumns = ['idmedico', 'nombres', 'apellidos', 'cmp', 'acciones'];
  dataSource: MatTableDataSource<Medico>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private medicoService: MedicoService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    //Cuando el componente carge se solicta todo el listado de medicos
    //utilizando el observable creado en el servicio medico.service

    //Los 3 metodos descritos aqui abajo estan suscritos a un 
    //observable, entonces no se ejecutan secuencialmente

    this.medicoService.medicosCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.medicoService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 2000 });
    });


    this.medicoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  
  //Parametro opcional 
  openDialog(medico?: Medico) {
    let med = medico != null ? medico : new Medico();
    this.dialog.open(DialogoComponent, {
      width: '250px',
      disableClose: true,
      data: med
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  eliminar(medico: Medico) {
    this.medicoService.eliminar(medico.idMedico).subscribe(data => {
      this.medicoService.listar().subscribe(medicos => {
        this.medicoService.medicosCambio.next(medicos);
        this.medicoService.mensajeCambio.next("Se eliminó");
      });
    });
  }

}
