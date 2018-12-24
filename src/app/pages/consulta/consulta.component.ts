import { DetalleConsulta } from './../../_model/detalleConsulta';
import { ExamenService } from './../../_service/examen.service';
import { Paciente } from './../../_model/paciente';
import { ConsultaService } from './../../_service/consulta.service';
import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'src/app/_service/paciente.service';
import { Medico } from 'src/app/_model/medico';
import { Especialidad } from 'src/app/_model/especialidad';
import { MedicoService } from 'src/app/_service/medico.service';
import { EspecialidadService } from 'src/app/_service/especialidad.service';
import { Examen } from 'src/app/_model/examen';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  pacientes : Paciente[] = [];
  medicos: Medico[]=[];
  especialidades : Especialidad[] = [];
  examenes:Examen[] = [];

  maxFecha:Date=new Date();
  fechaSeleccionada : Date = new Date();

  diagnostico:string;
  tratamiento:string;

  idPacienteSeleccionado : number;  
  idMedico : number;   
  idEspecialidad: number;
  idExamen:number;
  detalleConsulta:DetalleConsulta[] =[];


  constructor(private consultaService:ConsultaService, private pacienteService:PacienteService,
              private medicoService: MedicoService, private especialiadaService:EspecialidadService,
              private examenService:ExamenService) { }

  ngOnInit() {
    this.listarPacientes();
    this.listarMedicos();
    this.listarEspecialidad();
    this.listarExamenes();
  }

  listarPacientes(){
   this.pacienteService.listar().subscribe(data=>{
      //console.log(data);
    this.pacientes = data;
    });
  }

  listarMedicos(){
    this.medicoService.listar().subscribe(data =>{
        this.medicos = data;
      }
    );
  }
  listarEspecialidad(){
    this.especialiadaService.listar().subscribe(data=>{
      this.especialidades = data;
    });
  }
  listarExamenes(){
    this.examenService.listar().subscribe(data=>{
      this.examenes = data;
    }

    );
  }

  agregar(){
    let det = new  DetalleConsulta();
    det.diagonostico =  this.diagnostico;
    det.tratamiento = this.tratamiento;
    this.detalleConsulta.push(det);
  }

  removerDiagnostico(index:number){
    this.detalleConsulta.splice(index,1);
  }



}
