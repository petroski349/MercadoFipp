package unoeste.fipp.mercadofipp.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import unoeste.fipp.mercadofipp.db.entity.User;
import unoeste.fipp.mercadofipp.service.UserService;

@RestController
@RequestMapping(value="access/")
public class AccessRestController {
    @Autowired
    private  UserService userService;
    @PostMapping(value = "login")
    public ResponseEntity<Object> login(String name, String pass)
    {
        User user = userService.get(name);
        if(user != null){
            if(user.getPass() == pass)
                return ResponseEntity.ok().body(true);                             //terá que retornar o token
        }
        return ResponseEntity.badRequest().body("Senha incorreta");
    }


}
