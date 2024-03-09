package bmg.nutrition_assistant.controller;

import bmg.nutrition_assistant.dto.RecipeDto;
import bmg.nutrition_assistant.service.RecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/recipes")
public class RecipeController {
    private final RecipeService recipeService;

    @GetMapping
    public ResponseEntity<List<RecipeDto>> getAllRecipes() {
        System.out.println(recipeService.getAllRecipes().size());
        return ResponseEntity.ok(recipeService.getAllRecipes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecipeDto> getRecipeById(@PathVariable String id) {
        RecipeDto recipeDto = recipeService.getRecipeById(id);

        if (recipeDto == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(recipeDto);
    }

    @PostMapping
    public ResponseEntity<RecipeDto> saveRecipe(@RequestBody RecipeDto recipeDto) {
        return ResponseEntity.ok(recipeService.saveRecipe(recipeDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable String id) {
        RecipeDto recipeDto = recipeService.getRecipeById(id);

        if (recipeDto == null) {
            return ResponseEntity.notFound().build();
        }

        recipeService.deleteRecipe(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecipeDto> updateRecipe(@PathVariable String id, @RequestBody RecipeDto recipeDto) {
        RecipeDto existingRecipeDto = recipeService.getRecipeById(id);

        if (existingRecipeDto == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(recipeService.updateRecipe(id, recipeDto));
    }
}
