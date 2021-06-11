package br.com.wk.service;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.wk.dto.UsuariosEstadoDTO;
import br.com.wk.model.Candidato;
import br.com.wk.repository.CandidatoRepository;

@Service
public class CandidatoServiceImpl implements CandidatoService {

	@Autowired
	CandidatoRepository candidatoRepository;

	@Override
	public int salvarCandidatos(List<Candidato> candidatos) {
		candidatos.stream().forEach(candidato -> candidatoRepository.save(candidato));
		return 1;
	}

	@Override
	public List<Double> indiceImc() {
		List<Double> indices = new ArrayList();
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
	public List<Double> porcentagemObesos() {
		List<Long> candidatos = candidatoRepository.contaCandidatosSexo();
		List<BigInteger> candidatosObesos = candidatoRepository.contaCandidatosSexoImc();
		List<Double> porcentagemCandidatosObesos = new ArrayList<>();
		Double porcentagem = (candidatosObesos.get(0).doubleValue() / candidatos.get(0).doubleValue() )* 100;
		porcentagemCandidatosObesos.add(porcentagem);
		porcentagem = (candidatosObesos.get(1).doubleValue() / candidatos.get(1).doubleValue() )* 100;
		porcentagemCandidatosObesos.add(porcentagem);
		return porcentagemCandidatosObesos;
	}

	@Override
	public List<Double> mediaIdadeCandidatosTipoSangue() {
		return candidatoRepository.mediaIdadeCandidatosTipoSangue();
	}

	@Override
	public List<Long> qtdDoadores() {
		List<String> doadorAPositivo = Arrays.asList("A+", "A-", "O+", "O-");
		List<String> doadorANegativo = Arrays.asList("A-", "O-");
		List<String> doadorBPositivo = Arrays.asList("B+", "B-", "O+", "O-");
		List<String> doadorBNegativo = Arrays.asList("B-", "O-");
		List<String> doadorABPositivo = Arrays.asList("A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-");
		List<String> doadorABNegativo = Arrays.asList("A-", "B-", "O-", "AB-");
		List<String> doadorOPositivo = Arrays.asList("O+", "O-");
		List<String> doadorONegativo = Arrays.asList("O-");

		List<Long> qtdDoadores = new ArrayList<>();
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

	@Override
	public List<Candidato> todos() {
		return this.candidatoRepository.findAll();
	}

	@Override
	public List<UsuariosEstadoDTO> porEstado() {

		return candidatoRepository.listarCandidatosEstado();
	}
}
