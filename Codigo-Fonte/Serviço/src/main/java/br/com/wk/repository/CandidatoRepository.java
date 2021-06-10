package br.com.wk.repository;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.wk.dto.UsuariosEstadoDTO;
import br.com.wk.model.Candidato;

@Repository
public interface CandidatoRepository extends JpaRepository<Candidato, Long>{

	  /*@Query(value = "Select br.com.wk.dto.UsuariosEstadoDTO(count(c), c.estado) "
	  		+ "from Candidato c group by c.estado")
	    List<UsuariosEstadoDTO> listarCandidatosEstado();*/
	  
	  
}
