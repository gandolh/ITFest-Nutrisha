package bmg.nutrition_assistant.controller;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ask-ollama")
public class GemmaController {

    @GetMapping
    public ResponseEntity<String> askGemma() {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:11434/api/generate"))
                .method("POST", HttpRequest.BodyPublishers.ofString("{\"model\": \"llama2\", \"prompt\": \"Give me details about the Red Velvet Cake recipe using the following template:\nDescription:\n<long description>\nIngredients:\n- <number> <unit of measure>\n- <number> <just the ingredient>\nPreparing steps:\n1. <step description>\n2. <step description>\nNutritional values:\n- <number> calorie\n- <number> protein\n- <number> fat\n- <number> carbohydrate\"}"))
                .build();

        HttpResponse<String> response = null;

        try {
            response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println(response.body());

        return ResponseEntity.ok(response.body());
    }
}
