import { ConsultaListaExamen } from './../_model/consultaListaExamen';
import { HttpClient } from '@angular/common/http';
import { HOST } from './../_shared/var.constant';
import { Injectable } from '@angular/core';
import { FiltroConsulta } from '../_model/filtroConsulta';
import { Consulta } from '../_model/consulta';
import { ConsultaResumen } from '../_model/consultaResumen';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  url : string = `${HOST}/consultas`;

  constructor(private http:HttpClient) { }

  registrar(consultaDTO:ConsultaListaExamen){
    return this.http.post(this.url, consultaDTO);
  }

  //DTO de apoyo, para representar la informacion del formulario
  buscar(filtroConsulta: FiltroConsulta){
    //Se pasa la url y el criterio de busqueda
    return this.http.post<Consulta[]>(`${this.url}/buscar`, filtroConsulta);
  }

  listarResumen(){
    return this.http.get<ConsultaResumen[]>(`${this.url}/listarResumen`);
  }

  


}
