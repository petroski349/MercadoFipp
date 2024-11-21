package unoeste.fipp.mercadofipp.restcontroller;

import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import unoeste.fipp.mercadofipp.db.entity.Ad;
import unoeste.fipp.mercadofipp.db.repository.AdRepository;
import unoeste.fipp.mercadofipp.restcontroller.security.JWTTokenProvider;
import unoeste.fipp.mercadofipp.service.AdService;

import java.util.List;

@RestController
@RequestMapping(value="apis/ad")
public class AdRestController {
    
    @Autowired
    private AdService adService;

    @Autowired
    private JWTTokenProvider jwtTokenProvider;

    @GetMapping(value="get-one")
    public ResponseEntity<Object> getOne(Long id)
    {
        Ad ad=adService.getAd(id);
        if(ad!=null)
            return ResponseEntity.ok(ad);
        else
            return ResponseEntity.badRequest().body("erro");
    }
    @GetMapping(value="get-many")
    public ResponseEntity<Object> getMany()
    {
        return ResponseEntity.ok(adService.getAllAd(""));
    }

    @GetMapping(value="get-with-filter")
    public ResponseEntity<Object> getWithFilter(String filtro)
    {
        return ResponseEntity.ok(adService.getAllAd(filtro));
    }

    @PostMapping(value="add")
    public ResponseEntity<Object> add(@RequestBody Ad ad) {
        ad = adService.addAd(ad);
        if(ad!=null)
            return ResponseEntity.ok(ad);
        else
            return ResponseEntity.badRequest().body("Erro");

    }
    @GetMapping(value="delete")
    public ResponseEntity<Object> delete(Long id,@RequestHeader("Authorization") String token)
    {
        Claims claims = jwtTokenProvider.getAllClaimsFromToken(token);
        String nivel = (String) claims.get("nivel");
        String name = (String) claims.get("usuario");
        if(nivel == "2" || adService.isMyAd(name,id)) {
            if (adService.deleteAd(id))
                return ResponseEntity.ok("ok");
            else
                return ResponseEntity.badRequest().body("erro");
        }
        else{
           return ResponseEntity.badRequest().body("Acesso negado");
        }
    }
    @GetMapping(value = "lates")
    public ResponseEntity<Object> lates(){
        return ResponseEntity.ok(adService.get5LatestAd());
    }

    @GetMapping(value = "get-category")
    public ResponseEntity<Object> getAllByCategory(Long categoryId){
        List<Ad> ads = adService.getAllByCategory(categoryId);
        if(ads != null)
            return ResponseEntity.ok(ads);
        else
            return ResponseEntity.badRequest().body("Erro");
    }

    @GetMapping(value = "my-ad")
    public ResponseEntity<Object> getAllByUser(@RequestHeader("Authorization") String token){
        Claims claims = jwtTokenProvider.getAllClaimsFromToken(token);
        String user = (String) claims.get("usuario");
        List<Ad> ads = adService.getALLByUser(user);
        return ResponseEntity.ok(ads);
    }
}