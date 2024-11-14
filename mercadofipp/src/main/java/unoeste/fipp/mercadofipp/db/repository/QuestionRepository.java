package unoeste.fipp.mercadofipp.db.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import unoeste.fipp.mercadofipp.db.entity.Ad;
import unoeste.fipp.mercadofipp.db.entity.Question;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question,Long> {

    @Query(value = "SELECT * FROM pergunta_anuncio WHERE anu_id = :adId ORDER BY per_id ASC", nativeQuery = true)
    List<Question> findAllByAdId(@Param("adId") Long adId);

    @Transactional
    @Modifying
    @Query(value = "UPDATE pergunta_anuncio SET per_resp = :response WHERE per_id = :perId", nativeQuery = true)
    void updateResponse(@Param("response") String resp, @Param("perId") Long perId);


}
