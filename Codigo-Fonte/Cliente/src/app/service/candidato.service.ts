import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app-constants';
import { Observable } from 'rxjs';
import {Candidato} from '../model/Candidato'

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  constructor(private http: HttpClient) {
  }

  salvarCandidatos(ar): Observable<any> {
    return this.http.post<any>(AppConstants.baseUrlCandidato + "salvaCandidatos", ar);
  }
}
