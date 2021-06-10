package br.com.wk.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.wk.model.Usuario;

@Repository
public interface UsuarioRepository extends CrudRepository<Usuario, Long> {

	@Query("select u from Usuario u where u.login =?1")
	Usuario findUserByLogin(String login);

	@Transactional
	@Modifying
	@Query(nativeQuery = true, value = "update usuario set token = ?1 where login=?2")
	void atualizaTokenUser(String token, String login);

	@Query(value = "SELECT constraint_name from information_schema.constraint_column_usage  where table_name = 'usuarios_role' and column_name = 'role_id' and constraint_name <> 'unique_role_user';", nativeQuery = true)
	String consultaConstraintRole();

	@Transactional
	@Modifying
	@Query(nativeQuery = true, value = "insert into usuarios_role (usuario_id, role_id) values(?1, (select id from role where nome_role = 'ROLE_USER')); ") 
	void insereAcessoRoleUser(Long idUser);

	@Transactional
	@Modifying
	@Query(nativeQuery = true, value = "insert into usuarios_role (usuario_id, role_id) values(?1, (select id from role where nome_role = 'ROLE_ADMIN')); ") 
	void insereAcessoRoleAdmin(Long idUser);

}
