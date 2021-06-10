import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home-doador',
  templateUrl: './home-doador.component.html',
  styleUrls: ['./home-doador.component.css']
})
export class HomeDoadorComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  public sair() {
    localStorage.clear();
    location.reload()
  }
}
