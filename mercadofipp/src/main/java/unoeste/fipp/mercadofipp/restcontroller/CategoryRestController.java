package unoeste.fipp.mercadofipp.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import unoeste.fipp.mercadofipp.db.entity.Category;
import unoeste.fipp.mercadofipp.service.CategoryService;

import java.util.List;

@RestController
@RequestMapping(value = "apis/category")
public class CategoryRestController {
    @Autowired
    CategoryService categoryService;

    @GetMapping(value ="get-one")
    public ResponseEntity<Object> getOne(Long id){
        Category category = categoryService.get(id);
        return ResponseEntity.ok(category);
    }

    @GetMapping(value = "get-many")
    public ResponseEntity<Object> getMany(){
        List<Category> categorys = categoryService.getAll();
        return ResponseEntity.ok(categorys);

    }

    @GetMapping(value = "delete")
    public ResponseEntity<Object> delete(Long id){
        if(categoryService.delete(id))
            return ResponseEntity.ok().body("Ok");
        else
            return ResponseEntity.badRequest().body("Erro");
    }

    @GetMapping(value = "add")
    public ResponseEntity<Object> add(@RequestBody Category category) {
        category = categoryService.add(category);
        if (category != null)
            return ResponseEntity.ok(category);
        else
            return ResponseEntity.badRequest().body("Erro");
    }

}
