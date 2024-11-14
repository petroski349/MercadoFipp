package unoeste.fipp.mercadofipp.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import unoeste.fipp.mercadofipp.db.entity.Question;
import unoeste.fipp.mercadofipp.service.QuestionService;

@RestController
@RequestMapping(value = "apis/question")
public class QuestionRestController {
    private QuestionService questionService;

    @GetMapping(value = "get-Many")
    public ResponseEntity<Object> getMany(Long adId){
        return ResponseEntity.ok(questionService.getAll(adId));
    }

    @GetMapping(value = "add-question")
    public ResponseEntity<Object> add(@RequestBody Question question){
        question = questionService.add(question);
        return ResponseEntity.ok(question);
    }

//    @GetMapping(value = "add-response")
//    public ResponseEntity<Object> addResponse(Long adId, String response){
//        if(questionService.addResponse(response,adId)){
//            return questionService.get
//        }
//    }

}
