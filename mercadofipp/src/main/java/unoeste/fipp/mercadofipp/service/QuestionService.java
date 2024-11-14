package unoeste.fipp.mercadofipp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unoeste.fipp.mercadofipp.db.entity.Question;
import unoeste.fipp.mercadofipp.db.repository.QuestionRepository;

import java.util.List;

@Service
public class QuestionService {
    @Autowired
    private QuestionRepository questionRepository;

    public List<Question> getAll(Long adId){
        return questionRepository.findAllByAdId(adId);
    }

    public Question add(Question question){
        try{
            question = questionRepository.save(question);
        }catch (Exception e){
            question = null;
        }
        return  question;
    }

    public Boolean addResponse(String request,Long questionId){
        try{
            questionRepository.updateResponse(request,questionId);
            return true;
        }catch (Exception e){
            return false;
        }
    }
}
