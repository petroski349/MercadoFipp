package unoeste.fipp.mercadofipp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unoeste.fipp.mercadofipp.db.entity.Photo;
import unoeste.fipp.mercadofipp.db.repository.PhotoRepository;

import java.util.List;

@Service
public class PhotoService {
    @Autowired
    private PhotoRepository photoRepository;

    public Photo get(Long id){
        Photo photo = photoRepository.findById(id).get();
        return photo;
    }

    public List<Photo> getAll(Long adId){
        List<Photo> photos = photoRepository.findAllByAdId(adId);
        return photos;
    }

    public boolean delete(Long id){
        try {
            photoRepository.deleteById(id);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    public Photo add(Photo photo){
        photo = photoRepository.save(photo);
        return photo;
    }

}
