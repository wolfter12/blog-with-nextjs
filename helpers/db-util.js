import { MongoClient } from "mongodb";

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
  const client = await MongoClient.connect(process.env.MONGODB_CONNECTION_URL);

  return client;
};

export const insertDocument = async (client, collection, document) => {
  const db = client.db("events", {
    retryWrites: true,
    w: "majority",
  });

  return await db.collection(collection).insertOne(document);
};
