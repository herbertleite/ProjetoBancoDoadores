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


  getImcList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlCandidato + 'imc');
  }

  getObesosList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlCandidato + 'obesos');
  }

  getMediaIdadeList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlCandidato + 'media-idade-tipo-sangue');
  }

  getQuantidadeDoadoresList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlCandidato + 'quantidade-doadores');
  }

  getPorEstado(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlCandidato + 'por-estado');
  }

  salva(ar: any): Observable<any> {
    return this.http.post<any>(AppConstants.baseUrlCandidato + 'salva-candidatos',ar);
  }
}
