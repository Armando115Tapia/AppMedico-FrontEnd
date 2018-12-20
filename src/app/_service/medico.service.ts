import { HOST } from './../_shared/var.constant';
import { Medico } from './../_model/medico';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  medicosCambio = new Subject<Medico[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${HOST}/medicos`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Medico[]>(this.url);
  }

  listarPageable(p: number, s: number) {
    return this.http.get<Medico[]>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  listarMedicoPorId(id: number) {
    return this.http.get<Medico>(`${this.url}/${id}`);
  }

  registrar(medico: Medico) {
    return this.http.post(this.url, medico);
  }

  modificar(medico: Medico) {
    return this.http.put(this.url, medico);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
