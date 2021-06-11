package br.com.wk.service;

import java.util.List;

import br.com.wk.dto.UsuariosEstadoDTO;
import br.com.wk.model.Candidato;



public interface CandidatoService {

	
	public int salvarCandidatos(List<Candidato> candidatos);
	
	public List<Double> indiceImc();
	
	public List<Double> porcentagemObesos();
	
	public List<Double> mediaIdadeCandidatosTipoSangue();
	
	public List<Long> qtdDoadores();

	public List<Candidato> todos();

	public List<UsuariosEstadoDTO> porEstado();

}
