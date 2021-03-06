import { HttpClient } from '@angular/common/http';
import { HOST } from './../_shared/var.constant';
import { Examen } from './../_model/examen';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ConsultaListaExamen } from '../_model/consultaListaExamen';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  examenesCambio = new Subject<Examen[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${HOST}/examenes`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Examen[]>(this.url);
  }

  listarPageable(p: number, s: number) {
    return this.http.get<Examen[]>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  listarExamenPorId(id: number) {
    return this.http.get<Examen>(`${this.url}/${id}`);
  }

  registrar(examen: Examen) {
    return this.http.post(this.url, examen);
  }

  modificar(examen: Examen) {
    return this.http.put(this.url, examen);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listarExamenPorConsulta(idConsulta:number){
    return this.http.get<ConsultaListaExamen[]>(`${HOST}/consultaexamenes/${idConsulta}`);
  }
}
