import { randomUUID } from 'node:crypto';
import type { User, Recipe } from '@nutrisha/shared';
import { getDb } from './db.js';

// --- row <-> domain mapping (nested fields are stored as JSON text) ---

function parseJson<T>(value: unknown): T | null {
  if (value == null) return null;
  return JSON.parse(value as string) as T;
}

function rowToUser(row: Record<string, unknown> | undefined): User | null {
  if (!row) return null;
  return {
    id: row.id as string,
    email: row.email as string,
    password: row.password as string,
    firstName: row.firstName as string,
    lastName: row.lastName as string,
    height: (row.height as number | null) ?? null,
    weight: (row.weight as number | null) ?? null,
    mealPlan: parseJson<User['mealPlan']>(row.mealPlan),
  };
}

function rowToRecipe(row: Record<string, unknown> | undefined): Recipe | null {
  if (!row) return null;
  return {
    id: row.id as string,
    title: row.title as string,
    description: row.description as string,
    calories: row.calories as number,
    protein: row.protein as number,
    fat: row.fat as number,
    carbohydrate: row.carbohydrate as number,
    ingredients: parseJson<Recipe['ingredients']>(row.ingredients),
    steps: parseJson<Recipe['steps']>(row.steps),
  };
}

// --- User repository ---

export const userRepository = {
  findAll(): User[] {
    const rows = getDb().prepare('SELECT * FROM users').all() as Record<string, unknown>[];
    return rows.map((r) => rowToUser(r)!);
  },

  findById(id: string): User | null {
    const row = getDb().prepare('SELECT * FROM users WHERE id = ?').get(id) as
      | Record<string, unknown>
      | undefined;
    return rowToUser(row);
  },

  findByEmail(email: string): User | null {
    const row = getDb().prepare('SELECT * FROM users WHERE email = ?').get(email) as
      | Record<string, unknown>
      | undefined;
    return rowToUser(row);
  },

  save(user: User): User {
    const id = user.id ?? randomUUID();
    getDb()
      .prepare(
        `INSERT INTO users (id, email, password, firstName, lastName, height, weight, mealPlan)
         VALUES (@id, @email, @password, @firstName, @lastName, @height, @weight, @mealPlan)
         ON CONFLICT(id) DO UPDATE SET
           email=excluded.email, password=excluded.password,
           firstName=excluded.firstName, lastName=excluded.lastName,
           height=excluded.height, weight=excluded.weight, mealPlan=excluded.mealPlan`,
      )
      .run({
        id,
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        height: user.height ?? null,
        weight: user.weight ?? null,
        mealPlan: user.mealPlan != null ? JSON.stringify(user.mealPlan) : null,
      });
    return this.findById(id)!;
  },

  deleteById(id: string): void {
    getDb().prepare('DELETE FROM users WHERE id = ?').run(id);
  },
};

// --- Recipe repository ---

export const recipeRepository = {
  findAll(): Recipe[] {
    const rows = getDb().prepare('SELECT * FROM recipes').all() as Record<string, unknown>[];
    return rows.map((r) => rowToRecipe(r)!);
  },

  findById(id: string): Recipe | null {
    const row = getDb().prepare('SELECT * FROM recipes WHERE id = ?').get(id) as
      | Record<string, unknown>
      | undefined;
    return rowToRecipe(row);
  },

  save(recipe: Recipe): Recipe {
    const id = recipe.id ?? randomUUID();
    getDb()
      .prepare(
        `INSERT INTO recipes (id, title, description, calories, protein, fat, carbohydrate, ingredients, steps)
         VALUES (@id, @title, @description, @calories, @protein, @fat, @carbohydrate, @ingredients, @steps)
         ON CONFLICT(id) DO UPDATE SET
           title=excluded.title, description=excluded.description,
           calories=excluded.calories, protein=excluded.protein,
           fat=excluded.fat, carbohydrate=excluded.carbohydrate,
           ingredients=excluded.ingredients, steps=excluded.steps`,
      )
      .run({
        id,
        title: recipe.title,
        description: recipe.description,
        calories: recipe.calories,
        protein: recipe.protein,
        fat: recipe.fat,
        carbohydrate: recipe.carbohydrate,
        ingredients: recipe.ingredients != null ? JSON.stringify(recipe.ingredients) : null,
        steps: recipe.steps != null ? JSON.stringify(recipe.steps) : null,
      });
    return this.findById(id)!;
  },

  deleteById(id: string): void {
    getDb().prepare('DELETE FROM recipes WHERE id = ?').run(id);
  },
};
