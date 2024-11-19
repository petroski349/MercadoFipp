package unoeste.fipp.mercadofipp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unoeste.fipp.mercadofipp.db.entity.User;
import unoeste.fipp.mercadofipp.db.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User get(String name){
        User user = userRepository.findByName(name);
        return user;
    }

    public User add(User user){
        user = userRepository.save(user);
        return user;
    }

}
