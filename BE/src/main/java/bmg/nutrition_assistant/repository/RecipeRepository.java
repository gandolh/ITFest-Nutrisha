package bmg.nutrition_assistant.repository;

import bmg.nutrition_assistant.entity.Recipe;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RecipeRepository extends MongoRepository<Recipe, String> {
}
