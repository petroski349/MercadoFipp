package unoeste.fipp.mercadofipp.restcontroller;

import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import unoeste.fipp.mercadofipp.db.entity.Category;
import unoeste.fipp.mercadofipp.restcontroller.security.JWTTokenProvider;
import unoeste.fipp.mercadofipp.service.CategoryService;

import java.util.List;

@RestController
@RequestMapping(value = "apis/category")
public class CategoryRestController {
    @Autowired
    CategoryService categoryService;

    @Autowired
    JWTTokenProvider jwtTokenProvider;

    @GetMapping(value = "get-one")
    public ResponseEntity<Object> getOne(Long id) {
        Category category = categoryService.get(id);
        return ResponseEntity.ok(category);
    }

    @GetMapping(value = "get-many")
    public ResponseEntity<Object> getMany() {
        List<Category> categorys = categoryService.getAll();
        return ResponseEntity.ok(categorys);

    }

    @GetMapping(value = "delete")
    public ResponseEntity<Object> delete(Long id, @RequestHeader("Authorization") String token) {
        Claims claims = jwtTokenProvider.getAllClaimsFromToken(token);
        if((String) claims.get("nivel") == "2"){
            if (categoryService.delete(id))
                return ResponseEntity.ok().body("Ok");
            else
                return ResponseEntity.badRequest().body("Erro");
        }
        else{
            return ResponseEntity.badRequest().body("Acesso negado");
        }
    }

    @GetMapping(value = "add")
    public ResponseEntity<Object> add(@RequestBody Category category, @RequestHeader("Authorization") String token) {
        // Extrair informações do token
        Claims claims = jwtTokenProvider.getAllClaimsFromToken(token);
        String level = (String) claims.get("nivel"); // Pega o valor do campo "level"

        System.out.println("--> Issuer: " + claims.getIssuer());
        System.out.println("--> nivel: " + level);

        // Realizar lógica com base no nível
        category = categoryService.add(category);
        if (category != null) {
            return ResponseEntity.ok(category);
        } else {
            return ResponseEntity.badRequest().body("Erro");
        }
    }
}
