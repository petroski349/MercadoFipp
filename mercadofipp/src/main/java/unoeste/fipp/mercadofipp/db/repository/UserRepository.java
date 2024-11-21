package unoeste.fipp.mercadofipp.db.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import unoeste.fipp.mercadofipp.db.entity.Ad;
import unoeste.fipp.mercadofipp.db.entity.User;

import java.util.List;

public interface UserRepository extends JpaRepository<User,Long> {
    @Query(value = "SELECT * FROM usuario WHERE LOWER(usr_name) = LOWER(:name)", nativeQuery = true)
    User findByName(@Param("name") String name);

    @Transactional
    @Modifying
    @Query(value = "UPDATE usuario SET usr_senha = :senhaNova WHERE usr_id = :id", nativeQuery = true)
    void updateSenha(@Param("senhaNova") String resp, @Param("id") Long perId);
}
