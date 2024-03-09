from flask import Flask, request
import ollama
from pymongo import MongoClient
from dotenv import dotenv_values

config = dotenv_values(".env")

app = Flask(__name__)

client = MongoClient(config['CONNECTION_STRING'])
db = client['nutrition-assistant']

recipes = db['recipes']

ollama_model = 'gemma'


@app.route('/recipes/generate', methods=['GET'])
def call_ollama():
    count = 0
    total = recipes.count_documents({})
    for recipe in recipes.find():
        # If the recipe does not have a description, skip it
        if recipe.get('description') != None:
            count += 1
            title = recipe.get('title')
            print("Skipped: " + title)
            print(str(count) + " / " + str(total))
            continue
        else:
            count += 1
            title = recipe.get('title')
        
            generated_object = ollama.generate(model=ollama_model, prompt="Give me details about the " + title + " recipe using the following template:\nDescription:\n<long description>\nIngredients:\n- <number> <unit of measure>\n- <number> <just the ingredient>\nPreparing steps:\n1. <step description>\n2. <step description>\nNutritional values:\n- <number> calorie\n- <number> protein\n- <number> fat\n- <number> carbohydrate")
        
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
                if len(ingredients_temp) == 1:
                    ingredients_json.append({"amount": "", "name": ingredients_temp[0]})
                elif ingredients_temp[1].find('cup') != -1 or ingredients_temp[1].find('tsp') != -1 or ingredients_temp[1].find('tbsp') != -1 or ingredients_temp[1].find('oz') != -1 or ingredients_temp[1].find('lb') != -1 or ingredients_temp[1].find('pound') != -1 or ingredients_temp[1].find('teaspoon') != -1 or ingredients_temp[1].find('tablespoon') != -1:
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
            print("Updated: " + title)
            print(str(count) + " / " + str(total))
    
    return "Updated " + str(count) + " out of " + str(total) + " recipes!"


def add_recipe(title):
    if recipes.find_one({"title": title}):
        return 0

    generated_object = ollama.generate(model=ollama_model, prompt="Give me details about the " + title + " recipe using the following template:\nDescription:\n<long description>\nIngredients:\n- <number> <unit of measure>\n- <number> <just the ingredient>\nPreparing steps:\n1. <step description>\n2. <step description>\nNutritional values:\n- <number> calorie\n- <number> protein\n- <number> fat\n- <number> carbohydrate")

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
        "title": title,
        "description": description,
        "ingredients": ingredients_json,
        "steps": steps_json,
        "calories": nutritional_numbers[0],
        "protein": nutritional_numbers[1],
        "fat": nutritional_numbers[2],
        "carbohydrate": nutritional_numbers[3]
    }

    newRecipe = {
        "title": title,
        "description": description,
        "ingredients": ingredients_json,
        "steps": steps_json,
        "calories": nutritional_numbers[0],
        "protein": nutritional_numbers[1],
        "fat": nutritional_numbers[2],
        "carbohydrate": nutritional_numbers[3]
    }

    recipes.insert_one(recipe)

    return newRecipe


@app.route('/recipes/addRecipesByIngredients', methods=['POST'])
def add_recipes_by_ingredients():
    ingredients = request.json

    prompt = "Give me 3 recipe titles that contain the following ingredients: " + ' '.join(ingredients) + "."

    ollama_response = ollama.generate(model=ollama_model, prompt=prompt)

    response = ollama_response.get('response')
    
    response = response.split('\n')

    titles = [x[3 : ] for x in response]

    added_recipes = []
    for title in titles:
        added_recipes.append(add_recipe(title))

    added_recipes = [x for x in added_recipes if x != 0]

    return added_recipes


@app.route('/chat', methods=['POST'])
def chat():
    prompt = request.json['prompt']

    ollama_response = ollama.generate(model=ollama_model, prompt=prompt)

    response = ollama_response.get('response')

    return response


if __name__ == '__main__':
    app.run(debug=True)
