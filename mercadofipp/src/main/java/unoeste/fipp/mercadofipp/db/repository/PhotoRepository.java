package unoeste.fipp.mercadofipp.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import unoeste.fipp.mercadofipp.db.entity.Photo;

public interface PhotoRepository extends JpaRepository<Photo,Long> {
}
