package bmg.nutrition_assistant.service;

import bmg.nutrition_assistant.dto.RecipeDto;
import bmg.nutrition_assistant.dto.RecipeIngredientDto;
import bmg.nutrition_assistant.mapper.RecipeMapper;
import bmg.nutrition_assistant.repository.RecipeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecipeService {
    private final RecipeRepository recipeRepository;

    public List<RecipeDto> getAllRecipes() {
        return recipeRepository.findAll().stream()
                .map(RecipeMapper::toDto)
                .collect(Collectors.toList());
    }

    public RecipeDto getRecipeById(String id) {
        return RecipeMapper.toDto(Objects.requireNonNull(recipeRepository.findById(id).orElse(null)));
    }

    public List<RecipeDto> getRecipesByIngredients(List<String> ingredients) {
        List<RecipeDto> recipes = getAllRecipes();
        List<RecipeDto> finalRecipes = new ArrayList<>(recipes);

        for (RecipeDto recipe : recipes) {
            for (String ingredient : ingredients) {
                boolean contains = false;

                if (recipe.getIngredients() == null) {
                    finalRecipes.remove(recipe);
                    break;
                }

                for (RecipeIngredientDto recipeIngredient : recipe.getIngredients()) {
                    if (recipeIngredient.getName().contains(ingredient)) {
                        contains = true;
                        break;
                    }
                }

                if (!contains) {
                    finalRecipes.remove(recipe);
                    break;
                }
            }
        }

        return finalRecipes;
    }

    public RecipeDto saveRecipe(RecipeDto recipeDto) {
        return RecipeMapper.toDto(recipeRepository.save(RecipeMapper.toEntity(recipeDto)));
    }

    public void deleteRecipe(String id) {
        recipeRepository.deleteById(id);
    }

    public RecipeDto updateRecipe(String id, RecipeDto recipeDto) {
        return saveRecipe(RecipeMapper.updateDto(getRecipeById(id), recipeDto));
    }
}
