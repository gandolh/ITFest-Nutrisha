// Runtime configuration. Defaults mirror the original Spring Boot setup:
// server on :8080, MongoDB on the local default URI.
export const config = {
  port: Number(process.env.PORT ?? 8080),
  host: process.env.HOST ?? '0.0.0.0',
  mongoUri: process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017',
  dbName: process.env.MONGODB_DB ?? 'nutrition_assistant',
};
