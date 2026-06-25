import { ObjectId, type Collection, type WithId, type Document } from 'mongodb';
import type { User, Recipe } from '@nutrisha/shared';
import { getDb } from './db.js';

// --- id <-> _id mapping (Spring exposed Mongo's _id as a String `id`) ---

function toIdString<T extends { id?: string }>(doc: WithId<Document> | null): T | null {
  if (!doc) return null;
  const { _id, ...rest } = doc;
  return { ...(rest as object), id: _id.toString() } as T;
}

function stripId<T extends { id?: string }>(entity: T): Omit<T, 'id'> {
  const { id: _omit, ...rest } = entity;
  return rest;
}

function asObjectId(id: string): ObjectId | null {
  return ObjectId.isValid(id) ? new ObjectId(id) : null;
}

// --- User repository (UserRepository extends MongoRepository<User, String>) ---

function users(): Collection {
  return getDb().collection('users');
}

export const userRepository = {
  async findAll(): Promise<User[]> {
    const docs = await users().find().toArray();
    return docs.map((d) => toIdString<User>(d)!);
  },

  async findById(id: string): Promise<User | null> {
    const oid = asObjectId(id);
    if (!oid) return null;
    return toIdString<User>(await users().findOne({ _id: oid }));
  },

  async findByEmail(email: string): Promise<User | null> {
    return toIdString<User>(await users().findOne({ email }));
  },

  async save(user: User): Promise<User> {
    if (user.id) {
      const oid = asObjectId(user.id);
      if (oid) {
        await users().replaceOne({ _id: oid }, stripId(user), { upsert: true });
        return (await this.findById(user.id))!;
      }
    }
    const result = await users().insertOne(stripId(user) as Document);
    return { ...user, id: result.insertedId.toString() };
  },

  async deleteById(id: string): Promise<void> {
    const oid = asObjectId(id);
    if (oid) await users().deleteOne({ _id: oid });
  },
};

// --- Recipe repository (RecipeRepository extends MongoRepository<Recipe, String>) ---

function recipes(): Collection {
  return getDb().collection('recipes');
}

export const recipeRepository = {
  async findAll(): Promise<Recipe[]> {
    const docs = await recipes().find().toArray();
    return docs.map((d) => toIdString<Recipe>(d)!);
  },

  async findById(id: string): Promise<Recipe | null> {
    const oid = asObjectId(id);
    if (!oid) return null;
    return toIdString<Recipe>(await recipes().findOne({ _id: oid }));
  },

  async save(recipe: Recipe): Promise<Recipe> {
    if (recipe.id) {
      const oid = asObjectId(recipe.id);
      if (oid) {
        await recipes().replaceOne({ _id: oid }, stripId(recipe), { upsert: true });
        return (await this.findById(recipe.id))!;
      }
    }
    const result = await recipes().insertOne(stripId(recipe) as Document);
    return { ...recipe, id: result.insertedId.toString() };
  },

  async deleteById(id: string): Promise<void> {
    const oid = asObjectId(id);
    if (oid) await recipes().deleteOne({ _id: oid });
  },
};
