package unoeste.fipp.mercadofipp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import unoeste.fipp.mercadofipp.db.entity.Ad;
import unoeste.fipp.mercadofipp.db.repository.AdRepository;

import java.util.List;

@Service
public class AdService {
    @Autowired
    private AdRepository adRepository;

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

    public boolean deleteAd(Long id) {
        try {
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
}




