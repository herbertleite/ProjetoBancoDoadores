package br.com.wk.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import br.com.wk.model.Candidato;
import br.com.wk.repository.CandidatoRepository;



public interface CandidatoService {

	
	public int salvarCandidatos(List<Candidato> candidatos);
	
	public List<Double> indiceImc();
	
	public List<Double> porcentagemObesos();
	
	public List<Double> mediaIdadeCandidatosTipoSangue();
	
	public List<Long> qtdDoadores();
}
