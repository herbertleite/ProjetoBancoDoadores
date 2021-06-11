package br.com.wk.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.wk.dto.UsuariosEstadoDTO;
import br.com.wk.model.Candidato;
import br.com.wk.service.CandidatoService;

@RestController
@RequestMapping(value = "/candidato")
public class CandidatoController {


	@Autowired
	private CandidatoService candidatoService;

	@PostMapping(value = "/salva-candidatos", produces = "application/json")
	public ResponseEntity<Integer>todosCandidatos(@Valid @RequestBody List<Candidato> l) {
		return new ResponseEntity<Integer>(candidatoService.salvarCandidatos(l), HttpStatus.OK); 
	}
	
	@GetMapping(value = "/por-estado", produces = "application/json")
	public ResponseEntity< List<UsuariosEstadoDTO>>porEstado() {
		return new ResponseEntity< List<UsuariosEstadoDTO>>(candidatoService.porEstado(), HttpStatus.OK); 
	}
	
	@GetMapping(value = "/imc", produces = "application/json")
	public ResponseEntity<List<Double>>indiceImc() {
		return new ResponseEntity<List<Double>>(candidatoService.indiceImc(), HttpStatus.OK); 
	}
	
	@GetMapping(value = "/obesos", produces = "application/json")
	public ResponseEntity<List<Double>>indiceObesos() {
		return new ResponseEntity<List<Double>>(candidatoService.porcentagemObesos(), HttpStatus.OK); 
	}
	
	@GetMapping(value = "/media-idade-tipo-sangue", produces = "application/json")
	public ResponseEntity<List<Double>>mediaIdadeCandidatosTipoSangue() {
		return new ResponseEntity<List<Double>>(candidatoService.mediaIdadeCandidatosTipoSangue(), HttpStatus.OK); 
	}
	

	@GetMapping(value = "/quantidade-doadores", produces = "application/json")
	public ResponseEntity<List<Long>>qtdDoadores() {
		return new ResponseEntity<List<Long>>(candidatoService.qtdDoadores(), HttpStatus.OK); 
	}
	
	@PostMapping(value = "/salvaCandidatos", produces = "application/json")
	public ResponseEntity<Integer> salvarCandidatos(@Valid @RequestBody List<Candidato> candidatos) {
		return new ResponseEntity<Integer>(candidatoService.salvarCandidatos(candidatos), HttpStatus.OK); 
	}

}
