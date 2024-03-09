package bmg.nutrition_assistant.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document(collection = "recipes")
@NoArgsConstructor
@Getter
@Setter
public class Recipe {
    @Id
    private String id;

    @Field
    private String title;

    @Field
    private String description;

    @Field
    private Integer calories;

    @Field
    private Integer protein;

    @Field
    private Integer fat;

    @Field
    private Integer carbohydrate;

    @Field
    private List<RecipeIngredient> ingredients;

    @Field
    private List<RecipeStep> steps;
}
