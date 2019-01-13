import { Paciente } from './_model/paciente';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MeterialModule} from './material/material.module';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { Not403Component } from './pages/not403/not403.component';
import { HttpClientModule } from '@angular/common/http';
import { PacienteEdicionComponent } from './pages/paciente/paciente-edicion/paciente-edicion.component';
import { EspecialidadEdicionComponent } from './pages/especialidad/especialidad-edicion/especialidad-edicion.component';
import { ExamenEdicionComponent } from './pages/examen/examen-edicion/examen-edicion.component';
import { DialogoComponent } from './pages/medico/dialogo/dialogo.component';
import { FormsModule } from '@angular/forms';
import { EspecialComponent } from './pages/consulta/especial/especial.component';
import { DialogoDetalleComponent } from './pages/buscar/dialogo-detalle/dialogo-detalle.component';



@NgModule({
  declarations: [
    AppComponent,
    BuscarComponent,
    ConsultaComponent,
    EspecialidadComponent,
    ExamenComponent,
    MedicoComponent,
    PacienteComponent,
    ReporteComponent,
    Not403Component,
    PacienteEdicionComponent,
    EspecialidadEdicionComponent,
    ExamenEdicionComponent,
    DialogoComponent,
    EspecialComponent,
    DialogoDetalleComponent
  ],
  //Se agrega componentes que van a estar embebidos dentro de otros componente, como es
  // el caso del dialog, para habilitar que el componente se muestre dentro de si mismo
  entryComponents:[DialogoComponent,DialogoDetalleComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MeterialModule,
    HttpClientModule, 
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
