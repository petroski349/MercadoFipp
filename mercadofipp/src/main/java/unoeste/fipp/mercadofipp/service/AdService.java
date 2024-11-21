package unoeste.fipp.mercadofipp.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import unoeste.fipp.mercadofipp.db.entity.Ad;
import unoeste.fipp.mercadofipp.db.entity.Photo;
import unoeste.fipp.mercadofipp.db.entity.Question;
import unoeste.fipp.mercadofipp.db.repository.AdRepository;
import unoeste.fipp.mercadofipp.db.repository.CategoryRepository;
import unoeste.fipp.mercadofipp.db.repository.PhotoRepository;
import unoeste.fipp.mercadofipp.db.repository.QuestionRepository;

import java.util.List;

@Service
public class AdService {
    @Autowired
    private AdRepository adRepository;

    @Autowired
    private PhotoRepository photoRepository;
    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private UserService userService;

    public Ad getAd(Long id) {
        Ad ad = adRepository.findById(id).get();
        return ad;
    }

    public List<Ad> getAllAd(String filter) {
        List<Ad> adList = null;
        if (filter.isEmpty())
            adList = adRepository.findAll();
        else
            adList = adRepository.findWithFilter(filter.toLowerCase());
        return adList;
    }

    public Ad addAd(Ad ad) {
        try {
            ad = adRepository.save(ad);
        } catch (Exception e) {
            ad = null;
        }
        return ad;
    }

    @Transactional
    public boolean deleteAd(Long id) {
        try {
            List<Photo> photos = photoRepository.findAllByAdId(id);
            List<Question> questions = questionRepository.findAllByAdId(id);
            for (Photo photo : photos)
                photoRepository.delete(photo);
            for (Question question : questions)
                questionRepository.delete(question);
            adRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }


    public List<Ad> get5LatestAd() {
        List<Ad> adList = null;
        adList = adRepository.findTop5ByOrderByIdDesc();
        return adList;
    }

    public  List<Ad> getAllByCategory(Long categoryId){
        List<Ad> ads;
        ads = adRepository.findAllByCategory(categoryId);
        return ads;
    }

    public  List<Ad> getALLByUser(String name){
        List<Ad> ads;
        ads = adRepository.findAllByUser(userService.get(name).getId());
        return ads;
    }

    public boolean isMyAd(String name,Long id){
        return userService.get(name).getId() == id;
    }
}




