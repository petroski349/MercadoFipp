package unoeste.fipp.mercadofipp.restcontroller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import unoeste.fipp.mercadofipp.db.entity.Photo;
import unoeste.fipp.mercadofipp.db.repository.PhotoRepository;
import unoeste.fipp.mercadofipp.service.PhotoService;

import java.util.List;

@RestController
@RequestMapping(value = "api/photo")
public class PhotoRestController {
    private PhotoService photoService;

    @GetMapping(value = "get")
    public ResponseEntity<Object> get(Long id){
        Photo photo = photoService.get(id);
        if(photo != null)
            return ResponseEntity.ok(photo);
        else
            return ResponseEntity.badRequest().body("Erro");
    }

    @GetMapping(value = "get-many")
    public ResponseEntity<Object> getMany(Long Adid){
        List<Photo> photo = photoService.getAll(Adid);
        if(photo != null)
            return ResponseEntity.ok(photo);
        else
            return ResponseEntity.badRequest().body("Erro");
    }

    @GetMapping(value = "delete")
    public ResponseEntity<Object> delete(Long id){
        if(photoService.delete(id))
            return ResponseEntity.ok().body("ok");
        else
            return ResponseEntity.badRequest().body("Erro");
    }

    @GetMapping(value = "add")
    public ResponseEntity<Object> add(@RequestBody Photo photo){
        photo = photoService.add(photo);
        if(photo != null)
            return ResponseEntity.ok(photo);
        else
            return ResponseEntity.badRequest().body("Erro");
    }
}
