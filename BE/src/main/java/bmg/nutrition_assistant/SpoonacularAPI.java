package bmg.nutrition_assistant;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import bmg.nutrition_assistant.entity.Recipe;
import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.MongoException;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.codecs.configuration.CodecProvider;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import static com.mongodb.MongoClientSettings.getDefaultCodecRegistry;
import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;

public class SpoonacularAPI {
    public static void main(String[] args) {
        String connectionString = "mongodb+srv://Barnie:MEclkmRFnksLyba3@nutrition-assistant.hjtasbs.mongodb.net/nutrition-assistant?retryWrites=true&w=majority&appName=Nutrition-Assistant";

        CodecProvider pojoCodecProvider = PojoCodecProvider.builder().automatic(true).build();

        CodecRegistry pojoCodecRegistry = fromRegistries(getDefaultCodecRegistry(), fromProviders(pojoCodecProvider));

        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString(connectionString))
                .build();

        try (MongoClient mongoClient = MongoClients.create(settings)) {
            try {
                MongoDatabase database = mongoClient.getDatabase("nutrition-assistant").withCodecRegistry(pojoCodecRegistry);
                MyGETRequest(database);
                System.out.println("Pinged your deployment. You successfully connected to MongoDB!");
            } catch (MongoException e) {
                e.printStackTrace();
            } catch (JSONException | IOException e) {
                throw new RuntimeException(e);
            }
        }
    }

    public static void MyGETRequest(MongoDatabase database) throws IOException, JSONException {
        URL urlForGetRequest = new URL("https://api.spoonacular.com/recipes/random?number=100&apiKey=796492ab51354f1185d1910257bd70f8");
        String readLine = null;
        HttpURLConnection conection = (HttpURLConnection) urlForGetRequest.openConnection();
        conection.setRequestMethod("GET");
        int responseCode = conection.getResponseCode();

        MongoCollection<Recipe> collection = database.getCollection("recipes", Recipe.class);


        if (responseCode == HttpURLConnection.HTTP_OK) {
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(conection.getInputStream()));
            StringBuffer response = new StringBuffer();
            while ((readLine = in .readLine()) != null) {
                response.append(readLine);
            } in .close();

            JSONObject myResponse = new JSONObject(response.toString());
            JSONArray array = myResponse.getJSONArray("recipes");
            for (int i = 0; i < array.length(); i++) {
                JSONObject object = array.getJSONObject(i);

                String title = object.getString("title");

                Recipe recipe = new Recipe();

                recipe.setTitle(title);

                collection.insertOne(recipe);
            }
        } else {
            System.out.println("GET NOT WORKED");
        }
    }
}
