# ITFest - Nutrisha
## Composition Team - BMG
- Bran Alexandru
- Mateian Tudor
- Gusatu Cristian

## Readme Summary
This readme contains:
 - Description
 - App screens
 - Technical description

## Description
This project is a Web Application that integrates AI with a meal planner. The main objetives of this application si to:
 - help people to find recipes with the ingredients that they have in the fridge.
 - see their nutritional values and ask for more details without reading a lot of documentation
 - planing and watching their diet during the week

It was made during the ITFest hackaton.
### Do You wonder how we done this?
We request a list of ingredients from the user and search in our database for recipes that contains those ingredients. If you don't like any of those, you can ask the LLM for more by pressing the generate new recipes button.
Once you find something you like, you can select it to see diferent details like nutritional values, full list of ingredients and steps for cooking. For more informations, you can interact with our chat assistant in the bottom-right corner.
If everything is allright for you, you can add this recipes to any meal of any day, and see the resulting stats in the home page.

## App screens

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

## Technical description
### Frontend
We made the interface in React, using:
- Mantine component library
- TailwindCSS
- Axios

### Backend
We made the backend using two APIs. One for LLM interaction and the other for base crud operations.

That one for LLM interaction was made using Python and Flask. The other one using Java with Springboot.

