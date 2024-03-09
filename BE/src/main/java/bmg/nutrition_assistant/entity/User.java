package bmg.nutrition_assistant.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.stereotype.Component;

@Component("users")
@NoArgsConstructor
@Getter
@Setter
public class User {
    @Id
    private String id;

    @Field
    private String email;

    @Field
    private String password;

    @Field
    private String firstName;

    @Field
    private String lastName;

    @Field
    private Integer height;

    @Field
    private Integer weight;
}
