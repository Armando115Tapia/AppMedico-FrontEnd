import { BuscarComponent } from './pages/buscar/buscar.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { ExamenEdicionComponent } from './pages/examen/examen-edicion/examen-edicion.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { PacienteEdicionComponent } from './pages/paciente/paciente-edicion/paciente-edicion.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { EspecialidadEdicionComponent } from './pages/especialidad/especialidad-edicion/especialidad-edicion.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { EspecialComponent } from './pages/consulta/especial/especial.component';

const routes: Routes = [
  {path:'paciente', component:PacienteComponent, children :[
    {path:"nuevo", component:PacienteEdicionComponent},
    {path:"edicion/:id", component:PacienteEdicionComponent}
  ]},
  {path:'examen', component:ExamenComponent, children:[
    {path:'nuevo', component:ExamenEdicionComponent},
    {path:'edicion/:id',component:ExamenEdicionComponent}
  ]},
  {path:'especialidad', component:EspecialidadComponent, children:[
    {path:'nuevo',component:EspecialidadEdicionComponent},
    {path:'edicion/:id',component:EspecialidadEdicionComponent}
  ]},
  {path:'medico',component:MedicoComponent},
  {path:'consulta',component:ConsultaComponent},
  {path:'consulta-especial',component:EspecialComponent},
  {path:'buscar',component:BuscarComponent},
  {path:'reporte',component:ReporteComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
