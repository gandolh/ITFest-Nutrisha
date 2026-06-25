"""Parse the LLM's free-text recipe template into a structured recipe dict.

This is a faithful extraction of the parsing logic that previously lived inline
in ``app.py`` (deduplicated into a single function).
"""

RECIPE_PROMPT_TEMPLATE = (
    "Give me details about the {title} recipe using the following template:\n"
    "Description:\n<long description>\n"
    "Ingredients:\n- <number> <unit of measure>\n- <number> <just the ingredient>\n"
    "Preparing steps:\n1. <step description>\n2. <step description>\n"
    "Nutritional values:\n- <number> calorie\n- <number> protein\n"
    "- <number> fat\n- <number> carbohydrate"
)

_AMOUNT_UNITS = (
    "cup", "tsp", "tbsp", "oz", "lb", "pound", "teaspoon", "tablespoon",
)


def build_recipe_prompt(title: str) -> str:
    return RECIPE_PROMPT_TEMPLATE.format(title=title)


def _parse_ingredients(ingredients_string: str) -> list[dict]:
    ingredients = ingredients_string.split("- ")[1:]
    result = []
    for ingredient in ingredients:
        parts = ingredient.split(" ")
        if len(parts) == 1:
            result.append({"amount": "", "name": parts[0]})
        elif any(unit in parts[1] for unit in _AMOUNT_UNITS):
            result.append({"amount": parts[0] + " " + parts[1], "name": " ".join(parts[2:])})
        elif parts[0].isdigit():
            result.append({"amount": parts[0], "name": " ".join(parts[1:])})
        else:
            result.append({"amount": "", "name": " ".join(parts[0:])})
    return result


def _parse_steps(steps_string: str) -> list[dict]:
    steps = []
    step = ""
    for i in range(len(steps_string)):
        if steps_string[i].isdigit() and i + 1 < len(steps_string) and steps_string[i + 1] == ".":
            steps.append(step)
            step = ""
        step += steps_string[i]
    steps.append(step)
    steps = steps[1:]

    result = []
    for step in steps:
        number = 0
        i = 0
        while i < len(step):
            if step[i].isdigit():
                number = number * 10 + int(step[i])
            else:
                break
            i += 1
        result.append({"order": number, "description": step[i + 2:]})
    return result


def _parse_nutritional_numbers(nutritional_values_string: str) -> list[int]:
    values = nutritional_values_string.split("- ")
    numbers = []
    number = 0
    for chunk in values:
        for char in chunk:
            if char.isdigit():
                number = number * 10 + int(char)
            else:
                numbers.append(number)
                number = 0
                break
    return numbers


def parse_recipe(title: str, response: str) -> dict:
    """Turn a raw LLM response into a recipe dict matching the backend schema."""
    response = response.replace("\n", "")

    description = response[
        response.find("**Description:**") + 16 : response.find("**Ingredients:**")
    ]
    ingredients_string = response[
        response.find("**Ingredients:**") + 16 : response.find("**Preparing steps:**")
    ]
    steps_string = response[
        response.find("**Preparing steps:**") + 20 : response.find("**Nutritional values:**")
    ]
    nutritional_values_string = response[response.find("**Nutritional values:**") + 23 :]

    nutritional_numbers = _parse_nutritional_numbers(nutritional_values_string)

    return {
        "title": title,
        "description": description,
        "ingredients": _parse_ingredients(ingredients_string),
        "steps": _parse_steps(steps_string),
        "calories": nutritional_numbers[0],
        "protein": nutritional_numbers[1],
        "fat": nutritional_numbers[2],
        "carbohydrate": nutritional_numbers[3],
    }
