package unoeste.fipp.mercadofipp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unoeste.fipp.mercadofipp.db.entity.Category;
import unoeste.fipp.mercadofipp.db.repository.CategoryRepository;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public Category get(Long id){
        Category category = categoryRepository.findById(id).get();
        return category;
    }

    public List<Category> getAll(){
        List<Category> categories = categoryRepository.findAll();
        return categories;
    }

    public boolean delete(Long id){
        try{
            categoryRepository.deleteById(id);
            return true;
        }
        catch(Exception e){
            return false;
        }
    }

    public  Category add(Category category){
        try{
            category = categoryRepository.save(category);
        }catch (Exception e){
            category = null;
        }
        return category;
    }
}
