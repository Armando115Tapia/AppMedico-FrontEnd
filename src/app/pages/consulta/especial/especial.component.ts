import { ConsultaListaExamen } from './../../../_model/consultaListaExamen';
import { MatSnackBar } from '@angular/material';
import { ConsultaService } from './../../../_service/consulta.service';
import { ExamenService } from './../../../_service/examen.service';
import { EspecialidadService } from './../../../_service/especialidad.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Consulta } from './../../../_model/consulta';
import { DetalleConsulta } from './../../../_model/detalleConsulta';
import { Especialidad } from './../../../_model/especialidad';
import { Examen } from './../../../_model/examen';
import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/_model/medico';
import { Paciente } from 'src/app/_model/paciente';
import { Observable } from 'rxjs';
import { MedicoService } from 'src/app/_service/medico.service';
import { PacienteService } from 'src/app/_service/paciente.service';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-especial',
  templateUrl: './especial.component.html',
  styleUrls: ['./especial.component.css']
})
export class EspecialComponent implements OnInit {

  //Se enlaza con el hmtl, el form group 
  form: FormGroup;

  myControlPaciente: FormControl = new FormControl();
  myControlMedico: FormControl = new FormControl();

  pacientes: Paciente[] = [];
  especialidades: Especialidad[] = [];
  medicos: Medico[] = [];
  consulta: Consulta;
  examenes: Examen[] = [];

  detalleConsulta: DetalleConsulta[] = [];
  examenesSeleccionados: Examen[] = [];
  diagnostico: string;
  tratamiento: string;
  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date()

  mensaje: string;

  filteredOptions: Observable<any[]>;
  filteredOptionsMedico: Observable<any[]>;

  pacienteSeleccionado: Paciente;
  medicoSeleccionado: Medico;
  especialidadSeleccionada: Especialidad;
  examenSeleccionado: Examen;

  constructor(private builder: FormBuilder, private especialidadService: EspecialidadService, private consultaService: ConsultaService,
    private pacienteService: PacienteService, private medicoService: MedicoService, private examenService: ExamenService,
    public snackBar: MatSnackBar) { 
    }

  ngOnInit() {

    //Se instancia el objeto del fomrmulario, para que ya este disponible
      //Se usa el builder xq se manejan objetos, no variables primitivas como en el form group
      this.form = this.builder.group({
        //En el formulario existiran unos formControlName con estos nombres
        'paciente': this.myControlPaciente,
        'especialidad': new FormControl(),
        'medico': this.myControlMedico,
        'fecha': new FormControl(new Date()),
        'diagnostico': new FormControl(''),
        'tratamiento': new FormControl('')
      });
    
    this.listarPacientes();
    this.listarEspecilidad();
    this.listarMedicos();
    this.listarExamenes();

    this.filteredOptions = this.myControlPaciente.valueChanges.pipe(map(val => this.filter(val)));
    this.filteredOptionsMedico = this.myControlMedico.valueChanges.pipe(map(val => this.filterMedico(val)));
  }

  //El if-else validad cuando existe (es un objeto) y cuando no existe en la data como un string, al no controlar esto se producen 
  //errores
  filter(val: any) {
    if (val != null && val.idPaciente > 0) {
      //El valor que ingresa sea busca y filtrado por nombre, apellido o dni en el caso que ingrese el DNI
      return this.pacientes.filter(option =>
        option.nombres.toLowerCase().includes(val.nombres.toLowerCase()) || 
        option.apellidos.toLowerCase().includes(val.apellidos.toLowerCase()) || 
        option.dni.includes(val.dni));
    } else {
      return this.pacientes.filter(option =>
        option.nombres.toLowerCase().includes(val.toLowerCase()) || option.apellidos.toLowerCase().includes(val.toLowerCase()) || option.dni.includes(val));
    }
  }

  filterMedico(val: any) {
    if (val != null && val.idMedico > 0) {
      return this.medicos.filter(option =>
        option.nombres.toLowerCase().includes(val.nombres.toLowerCase()) || option.apellidos.toLowerCase().includes(val.apellidos.toLowerCase()) || option.cmp.includes(val.cmp));
    } else {
      return this.medicos.filter(option =>
        option.nombres.toLowerCase().includes(val.toLowerCase()) || option.apellidos.toLowerCase().includes(val.toLowerCase()) || option.cmp.includes(val));
    }
  }

  displayFnMedico(val: Medico) {
    return val ? `${val.nombres} ${val.apellidos}` : val;
  }

  displayFn(val: Paciente) {
    return val ? `${val.nombres} ${val.apellidos}` : val;
  }

  listarPacientes() {
    this.pacienteService.listar().subscribe(data => {
      this.pacientes = data;
    });
  }

  listarEspecilidad() {
    this.especialidadService.listar().subscribe(data => {
      this.especialidades = data;
    })
  }

  listarMedicos() {
    this.medicoService.listar().subscribe(data => {
      this.medicos = data;
    })
  }
  listarExamenes() {
    this.examenService.listar().subscribe(data => {
      this.examenes = data;
    })
  }

  seleccionarPaciente(e: any){
    //console.log(e);
    this.pacienteSeleccionado = e.option.value;
  }

  seleccionarMedico(e : any){
    this.medicoSeleccionado = e.option.value;
  }

  estadoBotonRegistrar() {
    return (this.detalleConsulta.length === 0 || this.especialidadSeleccionada === null || this.medicoSeleccionado === null || this.pacienteSeleccionado === null);
  }

  agregar() {

    if (this.diagnostico != null && this.tratamiento != null) {
      let det = new DetalleConsulta();
      det.diagnostico = this.diagnostico;
      det.tratamiento = this.tratamiento;
      this.detalleConsulta.push(det);
      this.diagnostico = null;
      this.tratamiento = null;
    } else {
      this.mensaje = `Debe agregar un diagnÃ³stico y tramiento`;
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
    }
  }

  agregarExamen() {
    if (this.examenSeleccionado) {
      let cont = 0;
      for (let i = 0; i < this.examenesSeleccionados.length; i++) {
        let examen = this.examenesSeleccionados[i];
        if (examen.idExamen === this.examenSeleccionado.idExamen) {
          cont++;
          break;
        }
      }
      if (cont > 0) {
        this.mensaje = `El examen se encuentra en la lista`;
        this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
      } else {
        this.examenesSeleccionados.push(this.examenSeleccionado);
      }
    } else {
      this.mensaje = `Debe agregar un examen`;
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
    }
  }

  aceptar() {
    this.consulta = new Consulta();
    this.consulta.especialidad = this.form.value['especialidad']; //this.especialidadSeleccionada;
    this.consulta.paciente = this.form.value['paciente'];//this.pacienteSeleccionado;
    this.consulta.medico = this.form.value['medico'];//this.medicoSeleccionado;
    this.consulta.detalleConsulta = this.detalleConsulta;
    var tzoffset = (this.form.value['fecha']).getTimezoneOffset() * 60000;
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString()
    this.consulta.fecha = localISOTime;

    let consultaListaExamen = new ConsultaListaExamen();
    consultaListaExamen.consulta = this.consulta;
    consultaListaExamen.listExamen = this.examenesSeleccionados;

    console.log(consultaListaExamen);

    this.consultaService.registrar(consultaListaExamen).subscribe(data => {

      //console.log(data);

      this.snackBar.open("Se registrÃ³", "Aviso", { duration: 2000 });

      setTimeout(() => {
        this.limpiarControles();
      }, 2000);

    });
  }

  limpiarControles() {
    this.detalleConsulta = [];
    this.examenesSeleccionados = [];
    this.diagnostico = '';
    this.tratamiento = '';
    this.pacienteSeleccionado = null;
    this.especialidadSeleccionada = null;
    this.medicoSeleccionado = null;
    this.examenSeleccionado = null;
    this.fechaSeleccionada = new Date();
    this.fechaSeleccionada.setHours(0);
    this.fechaSeleccionada.setMinutes(0);
    this.fechaSeleccionada.setSeconds(0);
    this.fechaSeleccionada.setMilliseconds(0);
    this.mensaje = '';
    this.consulta = new Consulta();
  }

  removerDiagnostico(index: number) {
    this.detalleConsulta.splice(index, 1);
  }
  removerExamen(index: number) {
    this.examenesSeleccionados.splice(index, 1);
  }


}
