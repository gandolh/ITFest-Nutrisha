from flask import Flask
import ollama
from pymongo import MongoClient

app = Flask(__name__)

connection_string = "mongodb+srv://Barnie:MEclkmRFnksLyba3@nutrition-assistant.hjtasbs.mongodb.net/?retryWrites=true&w=majority&appName=Nutrition-Assistant"
client = MongoClient(connection_string)
db = client['nutrition-assistant']

recipes = db['recipes']


@app.route('/get-recipe-details', methods=['POST'])
def call_ollama():
    finalRecipe = {}
    for recipe in recipes.find():
        print(recipe.get('title'))
        finalRecipe = recipe.get('title')
    return ollama.generate(model='gemma', prompt="Give me details about the " + finalRecipe + " recipe using the following template:\nDescription:\n<long description>\nIngredients:\n- <number> <unit of measure>\n- <number> <just the ingredient>\nPreparing steps:\n1. <step description>\n2. <step description>\nNutritional values:\n- <number> calorie\n- <number> protein\n- <number> fat\n- <number> carbohydrate")

    # return ollama.generate(model='llama2', prompt="Give me details about the " + finalRecipe + " recipe using the following template:\nDescription:\nlong description\nIngredients:\n- number unit of measure\n- number ingredient\nPreparing steps:\n1. step description\n2. step description\nNutritional values:\n- number calorie\n- number protein\n- number fat\n- number carbohydrate")


if __name__ == '__main__':
    app.run(debug=True)
