package bmg.nutrition_assistant.repository;

import bmg.nutrition_assistant.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    public User findByEmail(String email);
}
