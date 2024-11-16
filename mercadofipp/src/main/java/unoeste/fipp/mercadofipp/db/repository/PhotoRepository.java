package unoeste.fipp.mercadofipp.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import unoeste.fipp.mercadofipp.db.entity.Photo;
import unoeste.fipp.mercadofipp.db.entity.Question;

import java.util.List;

public interface PhotoRepository extends JpaRepository<Photo,Long> {

    @Query(value = "SELECT * FROM foto_anuncio WHERE anu_id = :adId", nativeQuery = true)
    List<Photo> findAllByAdId(@Param("adId") Long adId);
}
