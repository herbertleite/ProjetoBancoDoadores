package br.com.wk.service;

import java.util.Arrays;
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

@Service
public class CandidatoServiceImpl implements CandidatoService{

	@Autowired
	CandidatoRepository candidatoRepository;
	
	@Override
	public int salvarCandidatos(List<Candidato> candidatos) {
		candidatos.stream()
	    .forEach(candidato -> candidatoRepository.save(candidato));
		return 1; 
	}
	
	
	@Override
	public List<Double> indiceImc() {
			List<Double> indices = null;
			indices.add(candidatoRepository.calculaImc(0, 10));
			indices.add(candidatoRepository.calculaImc(11, 20));
			indices.add(candidatoRepository.calculaImc(21, 30));
			indices.add(candidatoRepository.calculaImc(31, 40));
			indices.add(candidatoRepository.calculaImc(41, 50));
			indices.add(candidatoRepository.calculaImc(51, 60));
			indices.add(candidatoRepository.calculaImc(61, 70));
		return indices; 
	}
	
	@Override
	public List<Double> porcentagemObesos(){
			List<Long> candidatos = candidatoRepository.contaCandidatosSexo();
			List<Long> candidatosObesos = candidatoRepository.contaCandidatosSexoImc();
			List<Double> porcentagemCandidatosObesos = null;
			double porcentagem = candidatosObesos.get(0)/candidatos.get(0)*100;
			porcentagemCandidatosObesos.add(porcentagem);
			porcentagem = candidatosObesos.get(1)/candidatos.get(1)*100;
			porcentagemCandidatosObesos.add(porcentagem);
		return porcentagemCandidatosObesos;
	}
	
	@Override
	public List<Double> mediaIdadeCandidatosTipoSangue(){
		return mediaIdadeCandidatosTipoSangue();
	}
	
	@Override
	public List<Long> qtdDoadores(){
		List<String> doadorAPositivo =  Arrays.asList("A+","A-","O+","O-");
		List<String> doadorANegativo =  Arrays.asList("A-","O-");
		List<String> doadorBPositivo =  Arrays.asList("B+","B-","O+","O-");
		List<String> doadorBNegativo =  Arrays.asList("B-","O-");
		List<String> doadorABPositivo =  Arrays.asList("A+","B+","O+","AB+","A-","B-","O-","AB-");
		List<String> doadorABNegativo =  Arrays.asList("A-","B-","O-","AB-");
		List<String> doadorOPositivo =  Arrays.asList("O+","O-");
		List<String> doadorONegativo =  Arrays.asList("O-");
		List<Long> qtdDoadores = null;
		qtdDoadores.add(candidatoRepository.doadoresPorTipoSangue(doadorAPositivo));
		qtdDoadores.add(candidatoRepository.doadoresPorTipoSangue(doadorANegativo));
		qtdDoadores.add(candidatoRepository.doadoresPorTipoSangue(doadorBPositivo));
		qtdDoadores.add(candidatoRepository.doadoresPorTipoSangue(doadorBNegativo));
		qtdDoadores.add(candidatoRepository.doadoresPorTipoSangue(doadorABPositivo));
		qtdDoadores.add(candidatoRepository.doadoresPorTipoSangue(doadorABNegativo));
		qtdDoadores.add(candidatoRepository.doadoresPorTipoSangue(doadorOPositivo));
		qtdDoadores.add(candidatoRepository.doadoresPorTipoSangue(doadorONegativo));
		return qtdDoadores;
	}
}
