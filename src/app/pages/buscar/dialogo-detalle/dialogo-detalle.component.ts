import { ExamenService } from './../../../_service/examen.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Consulta } from 'src/app/_model/consulta';
import { ConsultaListaExamen } from 'src/app/_model/consultaListaExamen';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialogo-detalle',
  templateUrl: './dialogo-detalle.component.html',
  styleUrls: ['./dialogo-detalle.component.css']
})
export class DialogoDetalleComponent implements OnInit {

  consulta: Consulta;
  examenes: ConsultaListaExamen[];

  //El detalle esta embebedo dentro de buscar, aqui la logica para reciba los datos dentro 
  //del modal  
  constructor(public dialogRef: MatDialogRef<DialogoDetalleComponent>,
    //A la data se le pasa a consulta, solo es informativo
    @Inject(MAT_DIALOG_DATA) public data: Consulta,
    private examenService: ExamenService) { }

  ngOnInit() {
    this.consulta = this.data;
    this.listarExamenes();
  }

  listarExamenes() {
    this.examenService.listarExamenPorConsulta(this.consulta.idConsulta).subscribe((data) => {
      this.examenes = data;
    });
  }

  cancelar() {
    this.dialogRef.close();
  }

}
