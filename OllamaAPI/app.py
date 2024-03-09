from flask import Flask
import ollama
from pymongo import MongoClient

app = Flask(__name__)

connection_string = "mongodb+srv://Barnie:MEclkmRFnksLyba3@nutrition-assistant.hjtasbs.mongodb.net/?retryWrites=true&w=majority&appName=Nutrition-Assistant"
client = MongoClient(connection_string)
db = client['nutrition-assistant']

recipes = db['recipes']


@app.route('/generateRecipes', methods=['GET'])
def call_ollama():
    for recipe in recipes.find():
        title = recipe.get('title')

        generated_object = ollama.generate(model='gemma', prompt="Give me details about the " + title + " recipe using the following template:\nDescription:\n<long description>\nIngredients:\n- <number> <unit of measure>\n- <number> <just the ingredient>\nPreparing steps:\n1. <step description>\n2. <step description>\nNutritional values:\n- <number> calorie\n- <number> protein\n- <number> fat\n- <number> carbohydrate")

        response = generated_object.get('response')

        response = response.replace('\n', '')

        description_string = response[response.find('**Description:**') + 16 : response.find('**Ingredients:**')]
        ingredients_string = response[response.find('**Ingredients:**') + 16 : response.find('**Preparing steps:**')]
        steps_string = response[response.find('**Preparing steps:**') + 20 : response.find('**Nutritional values:**')]
        nutritional_values_string = response[response.find('**Nutritional values:**') + 23 :]

        description = description_string

        ingredients = ingredients_string.split('- ')
        ingredients = ingredients[1:]

        steps = []
        step = ""
        for i in range(len(steps_string)):
            if steps_string[i].isdigit() and steps_string[i + 1] == '.':
                steps.append(step)
                step = ""
            step += steps_string[i]
        steps.append(step)
        steps = steps[1:]

        nutritional_values = nutritional_values_string.split('- ')
        nutritional_numbers = []
        number = 0
        for x in nutritional_values:
            for char in x:
                if char.isdigit():
                    number = number * 10 + int(char)
                else:
                    nutritional_numbers.append(number)
                    number = 0
                    break

        ingredients_json = []
        for ingredient in ingredients:
            ingredients_temp = ingredient.split(' ')
            if ingredients_temp[1].find('cup') != -1 or ingredients_temp[1].find('tsp') != -1 or ingredients_temp[1].find('tbsp') != -1 or ingredients_temp[1].find('oz') != -1 or ingredients_temp[1].find('lb') != -1 or ingredients_temp[1].find('pound') != -1 or ingredients_temp[1].find('teaspoon') != -1 or ingredients_temp[1].find('tablespoon') != -1:
                ingredients_json.append({"amount": ingredients_temp[0] + ' ' + ingredients_temp[1], "name": ' '.join(ingredients_temp[2 : ])})
            elif ingredients_temp[0].isdigit():
                ingredients_json.append({"amount": ingredients_temp[0], "name": ' '.join(ingredients_temp[1 : ])})
            else:
                ingredients_json.append({"amount": "", "name": ' '.join(ingredients_temp[0 : ])})

        steps_json = []
        for step in steps:
            number = 0
            i = 0
            while i < len(step):
                if step[i].isdigit():
                    number = number * 10 + int(step[i])
                else:
                    break
                i += 1
            desc = step[i + 2 : ]
            steps_json.append({"order": number, "description": desc})

        recipe = {
            "description": description,
            "ingredients": ingredients_json,
            "steps": steps_json,
            "calories": nutritional_numbers[0],
            "protein": nutritional_numbers[1],
            "fat": nutritional_numbers[2],
            "carbohydrate": nutritional_numbers[3]
        }

        recipes.update_one({"title": title}, {"$set": recipe})

    return "Success!"


if __name__ == '__main__':
    app.run(debug=True)
