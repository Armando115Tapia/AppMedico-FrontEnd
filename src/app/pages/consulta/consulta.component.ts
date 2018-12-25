import { Consulta } from './../../_model/consulta';
import { Especialidad } from './../../_model/especialidad';
import { DetalleConsulta } from './../../_model/detalleConsulta';
import { ExamenService } from './../../_service/examen.service';
import { Paciente } from './../../_model/paciente';
import { ConsultaService } from './../../_service/consulta.service';
import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'src/app/_service/paciente.service';
import { Medico } from 'src/app/_model/medico';
import { MedicoService } from 'src/app/_service/medico.service';
import { EspecialidadService } from 'src/app/_service/especialidad.service';
import { Examen } from 'src/app/_model/examen';
import { MatSnackBar } from '@angular/material';

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
  examenesSeleccionados:Examen[]=[];

  fechaSeleccionada : Date = new Date();
  diagnostico:string;
  tratamiento:string;
  mensaje:string;

  idPacienteSeleccionado : number;  
  idEspecialidadSeleccionado: number;
  idMedicoSeleccionado : number;   
  idExamenSeleccionado : number;
   
  //idExamen:number;
  detalleConsulta:DetalleConsulta[] =[];


  constructor(private consultaService:ConsultaService, private pacienteService:PacienteService,
              private medicoService: MedicoService, private especialiadaService:EspecialidadService,
              private examenService:ExamenService, private snackBar: MatSnackBar) { }

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
    if(this.diagnostico != null && this.tratamiento != null){
      //Add only if diagnostico and tratamiento are not null
      let det = new DetalleConsulta();
      det.diagonostico = this.diagnostico;
      det.tratamiento = this.tratamiento;
      this.detalleConsulta.push(det);

      //clear data
      this.diagnostico=null;
      this.tratamiento=null;
    }else{
      this.mensaje = "Debe agregar un diagnostico y tratamiento";
      this.snackBar.open(this.mensaje,"Aviso",{duration:2000});

    }  
    /*
    let det = new  DetalleConsulta();
    det.diagonostico =  this.diagnostico;
    det.tratamiento = this.tratamiento;
    this.detalleConsulta.push(det);*/
  }

  removerDiagnostico(index:number){
    this.detalleConsulta.splice(index,1);
  }
  
  agregarExamen(){
    if(this.idExamenSeleccionado > 0){
      let cont =0;
      for(let i =0;i<this.examenesSeleccionados.length ; i++){
        let examen = this.examenesSeleccionados[i];
        if(examen.idExamen === this.idExamenSeleccionado){
          cont++;
          break;
        }
      }
      if(cont > 0){
        this.mensaje = "El examen se encuentra en la lista";
        this.snackBar.open(this.mensaje, "Aviso", {duration:2000});

      }else{
        let examen = new Examen();
        examen.idExamen = this.idExamenSeleccionado;
        this.examenService.listarExamenPorId(this.idExamenSeleccionado).subscribe(data=>{
          examen.nombre = data.nombre;
          this.examenesSeleccionados.push(examen);
        });
      }

    }else{
      this.mensaje ="Debe agregar un examen";
      this.snackBar.open(this.mensaje, "Aviso",{duration:2000});
    }
  }

  removerExamen(index:number){
    this.examenesSeleccionados.splice(index,1);
  }

  estadoBotonRegistrar(){
    return (this.detalleConsulta.length === 0 || this.idEspecialidadSeleccionado === 0 || this.idMedicoSeleccionado === 0 
      || this.idPacienteSeleccionado===0);
  }

  //In this method, JSON is build and send to backend 
  aceptar(){

    let medico = new Medico();
    medico.idMedico = this.idMedicoSeleccionado;

    let especialidad = new Especialidad();
    especialidad.idEspecialidad = this.idEspecialidadSeleccionado;

    let paciente = new Paciente();
    paciente.idPaciente = this.idPacienteSeleccionado;

    let consulta = new Consulta();
    consulta.especialidad = especialidad;
    consulta.paciente= paciente;
    consulta.medico = medico;

    //Obtain ISO DATE instead of work with date of JS, other option could be to use moment.js (review it)
    let tzoffset = (this.fechaSeleccionada).getTimezoneOffset() * 6000;
    let localISOTime = (new Date(Date.now() - tzoffset)).toISOString();
    consulta.fecha=localISOTime;

    consulta.detalleConsulta=this.detalleConsulta;

    console.log(consulta);

  }






}
