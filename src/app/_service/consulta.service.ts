import { ConsultaListaExamen } from './../_model/consultaListaExamen';
import { HttpClient } from '@angular/common/http';
import { HOST } from './../_shared/var.constant';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  url : string = `${HOST}/consultas`;

  constructor(private http:HttpClient) { }

  registrar(consultaDTO:ConsultaListaExamen){
    return this.http.post(this.url, consultaDTO);
  }

}
