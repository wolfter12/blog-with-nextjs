import { MongoClient } from "mongodb";

const connectionString = `${process.env.MONGODB_CONNECTION_SCHEMA}://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTERNAME}.ubt42.mongodb.net`;

export const getAllDocuments = async (
  client,
  dbName,
  collection,
  sort = {},
  filter = {}
) => {
  const db = client.db(dbName, {
    retryWrites: true,
    w: "majority",
  });

  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();

  client.close();

  return documents;
};

export const connectDatabase = async () => {
  const client = await MongoClient.connect(connectionString);

  return client;
};

export const getDbConnection = async (client) => {
  const db = client.db(process.env.MONGODB_DATABASE, {
    retryWrites: true,
    w: "majority",
  });

  return db;
};

export const insertDocument = async (client, collection, document) => {
  const db = client.db(process.env.MONGODB_DATABASE, {
    retryWrites: true,
    w: "majority",
  });

  return await db.collection(collection).insertOne(document);
};
