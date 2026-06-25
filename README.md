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


## Login 
![App_Login](https://github.com/gandolh/ITFest-Nutrisha/blob/main/Screenshoots/login.png?raw=true)

## Register
![App_Register](https://github.com/gandolh/ITFest-Nutrisha/blob/main/Screenshoots/register.png?raw=true)

## Home
![App_Home](https://github.com/gandolh/ITFest-Nutrisha/blob/main/Screenshoots/home.png?raw=true)

## Recipes - white theme
![App_Recipes](https://github.com/gandolh/ITFest-Nutrisha/blob/main/Screenshoots/recipes-white.png?raw=true)

## Meal Planner Modal
![App_MealPlannerModal](https://github.com/gandolh/ITFest-Nutrisha/blob/main/Screenshoots/mealPlannerModal.png?raw=true)

## Chat bot answer
![App_ChatBotAnswer](https://github.com/gandolh/ITFest-Nutrisha/blob/main/Screenshoots/chatbot-answer.png?raw=true)

## Recipes - dark theme
![App_RecipesDark](https://github.com/gandolh/ITFest-Nutrisha/blob/main/Screenshoots/recipes-dark.png?raw=true)

## Technical description

The project is organized as an **npm workspaces** monorepo:

```
packages/
├── shared/     @nutrisha/shared   – TypeScript domain types shared by FE & BE
├── backend/    @nutrisha/backend  – Fastify + TypeScript + MongoDB CRUD API
└── frontend/   @nutrisha/frontend – React + Vite + Mantine UI
OllamaAPI/                          – Python/Flask LLM service (separate)
```

### Frontend
We made the interface in React, using:
- Mantine component library
- TailwindCSS
- Axios

### Backend
The backend is split into two APIs. One for LLM interaction and the other for
base CRUD operations.

The LLM interaction API is built with Python and Flask (see `OllamaAPI/`). The
CRUD API was originally written in Java with Spring Boot and has since been
ported to **Fastify + TypeScript** (see `packages/backend/`), backed by MongoDB.
It exposes the same `/auth`, `/users`, and `/recipes` endpoints on port `8080`.

### Running it

```bash
# install all workspaces
npm install

# start the Fastify backend (needs MongoDB on localhost:27017)
npm run dev:backend

# start the React frontend
npm run dev:frontend
```

The Python LLM service is run separately from the `OllamaAPI/` directory.

