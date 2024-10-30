package unoeste.fipp.mercadofipp.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import unoeste.fipp.mercadofipp.db.entity.Ad;
import unoeste.fipp.mercadofipp.db.repository.AdRepository;

import java.util.List;

@RestController
@RequestMapping(value="apis/ad")
public class AdRestController {
    @Autowired
    private AdRepository adRepository;

    @GetMapping(value="get-one")
    public ResponseEntity<Object> getOne(Long id)
    {
        Ad ad = adRepository.findById(id).get();
        if(ad!=null)
            return ResponseEntity.ok(ad);
        else
            return ResponseEntity.badRequest().body("erro");
    }
    @GetMapping(value="get-many")
    public ResponseEntity<Object> getMany()
    {
        List<Ad> adList = adRepository.findAll();
        return ResponseEntity.ok(adList);
    }
    @GetMapping(value="get-with-filter")
    public ResponseEntity<Object> getWithFilter(String filtro)
    {
        List<Ad> adList = adRepository.findWithFilter(filtro.toLowerCase());
        return ResponseEntity.ok(adList);
    }

    @PostMapping(value="add")
    public ResponseEntity<Object> add(@RequestBody Ad ad) {
        try {
           ad = adRepository.save(ad);
            return ResponseEntity.ok(ad);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping(value="delete")
    public ResponseEntity<Object> delete(Long id)
    {
        try {
            adRepository.deleteById(id);
            return ResponseEntity.ok("ok");
        }catch (Exception e)
        {
            return ResponseEntity.badRequest().body("erro");
        }
    }

}
