import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CandidatoService } from '../service/candidato.service';
import { Candidato } from '../model/Candidato';

@Component({
  selector: 'app-home-doador',
  templateUrl: './home-doador.component.html',
  styleUrls: ['./home-doador.component.css']
})
export class HomeDoadorComponent implements OnInit {

  listaCandidatos: Array<Candidato>;

  imcList: any[];
  obesosList: Array<any>;
  mediaIdadeList: Array<any>;
  quantidadeDoadoresList: Array<Number>;
  porEstado :Array<any>;

  constructor(private router: Router, private candidatoService: CandidatoService) {
  }

  ngOnInit() {
    this.candidatoService.getPorEstado().subscribe(data => {
      this.porEstado = data;
    });

    this.candidatoService.getImcList().subscribe(data => {
      this.imcList = data;
      for(let i = 0; i < this.imcList.length; i ++){
        this.imcList[i] == null ? this.imcList[i] = 0 : this.imcList[i];
        this.imcList[i] = this.imcList[i].toFixed(2);
      }
    });

    this.candidatoService.getObesosList().subscribe(data => {
      this.obesosList = data;
      for(let i = 0; i < this.obesosList.length; i ++){
        this.obesosList[i] = this.obesosList[i].toFixed(2);
      }
    });

    this.candidatoService.getMediaIdadeList().subscribe(data => {
      this.mediaIdadeList = data;
      for(let i = 0; i < this.mediaIdadeList.length; i ++){
        this.mediaIdadeList[i] == null ? this.mediaIdadeList[i] = 0 : this.mediaIdadeList[i];
        this.mediaIdadeList[i] = this.mediaIdadeList[i].toFixed(2);
      }
    });

    this.candidatoService.getQuantidadeDoadoresList().subscribe(data => {
      this.quantidadeDoadoresList = data;
    });
  }

  public sair() {
    localStorage.clear();
    location.reload()
  }
}
