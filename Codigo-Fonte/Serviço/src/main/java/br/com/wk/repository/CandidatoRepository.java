package br.com.wk.repository;

import java.math.BigInteger;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.wk.dto.UsuariosEstadoDTO;
import br.com.wk.model.Candidato;

@Repository
public interface CandidatoRepository extends JpaRepository<Candidato, Long> {

	@Query(value = "Select new br.com.wk.dto.UsuariosEstadoDTO(count(c), c.estado) "
			+ "from Candidato c group by c.estado")
	List<UsuariosEstadoDTO> listarCandidatosEstado();

	@Query(value = "select avg((c.peso/(c.altura*c.altura))) as IMC from candidato c "
			+ "where (extract(year FROM age(current_date, to_date(c.data_nasc, 'DD/MM/YYYY')))) between :idade1 and :idade2", nativeQuery = true)
	Double calculaImc(@Param("idade1") int idade1, @Param("idade2") int idade2);

	@Query(value = "select count(c.*) from candidato c where (c.peso/(c.altura*c.altura)) > 30 group by c.sexo", nativeQuery = true)
	List<BigInteger> contaCandidatosSexoImc();

	@Query(value = "select count(c) from Candidato c group by c.sexo")

	List<Long> contaCandidatosSexo();

	@Query(value = "select avg(extract(year FROM age(current_date, to_date(data_nasc, 'DD/MM/YYYY')))) from candidato c group by tipo_sanguineo", nativeQuery = true)

	List<Double> mediaIdadeCandidatosTipoSangue();

	@Query(value = "select count(*) from candidato c where tipo_sanguineo in :listaTipo "
			+ "and extract(year FROM age(current_date, to_date(data_nasc, 'DD/MM/YYYY'))) > 16 "
			+ "and extract(year FROM age(current_date, to_date(data_nasc, 'DD/MM/YYYY'))) < 60 and peso > 50", nativeQuery = true)
	Long doadoresPorTipoSangue(@Param("listaTipo") List<String> listaTipo);

}
