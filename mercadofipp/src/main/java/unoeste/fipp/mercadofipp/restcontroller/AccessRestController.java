package unoeste.fipp.mercadofipp.restcontroller;

import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import unoeste.fipp.mercadofipp.db.entity.User;
import unoeste.fipp.mercadofipp.restcontroller.security.JWTTokenProvider;
import unoeste.fipp.mercadofipp.service.UserService;

@RestController
@RequestMapping(value = "access/")
public class AccessRestController {

    @Autowired
    private UserService userService;

    @Autowired
    private JWTTokenProvider jwtTokenProvider;

    @PostMapping(value = "login")
    public ResponseEntity<Object> login(@RequestParam String name, @RequestParam String pass) {
        User user = userService.get(name);
        if (user != null && user.getPass().equals(pass)) {
            // Gera o token JWT
            String token = jwtTokenProvider.getToken(user.getName(),user.getLevel());

            // Retorna o token para o cliente
            return ResponseEntity.ok().body(token);
        }
        return ResponseEntity.badRequest().body("Senha ou nome de usuário incorretos");
    }

    @PostMapping(value = "register")
    public ResponseEntity<Object> register(@RequestBody User user){
        if(userService.get(user.getName()) == null){
            user = userService.add(user);
            if(user != null)
                return ResponseEntity.ok().body("Registrado com sucesso!");
            else
                return ResponseEntity.badRequest().body("Erro");
        }
        else{
            return ResponseEntity.badRequest().body("Loguin ja em uso!");
        }

    }

//    @PostMapping(value = "get-user")
//    public ResponseEntity<Object> processToken(String token) {
//        Claims claims = null;
//        if(jwtTokenProvider.verifyToken(token))
//            claims = JWTTokenProvider.getAllClaimsFromToken(token);
//        else
//            System.out.println("token invalido");
//
//        if (claims != null) {
//            String usuario = claims.getSubject(); // O "subject" é o usuário
//            String nivel = claims.get("nivel", String.class); // A "claim" de nível
//
//            return ResponseEntity.ok().body(usuario+" "+nivel);
//        } else {
//            return ResponseEntity.ok().body("Erro");
//        }
//    }

}
