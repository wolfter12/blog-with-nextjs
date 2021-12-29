import {
  connectDatabase,
  insertDocument,
} from "../../../helpers/db-util";

function validateEmail(email) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { email, name, message } = req.body;

      if (
        !email ||
        !validateEmail(email) ||
        !name ||
        name.trim() === "" ||
        !message ||
        message.trim() === ""
      ) {
        res.status(422).json({ message: "Invalid input." });
        return;
      }

      // Store it in a database
      const newMessage = {
        email,
        name,
        message,
      };

      let client;

      try {
        client = await connectDatabase();
      } catch (error) {
        res.status(500).json({ message: "Could not connect to database." });
        return;
      }

      try {
        const result = await insertDocument(client, "messages", newMessage);
        newMessage.id = result.insertedId;
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Storing message in db failed!" });
        return;
      }

      client.close();

      res.status(201).json({ message: "Successfully stored message!" });
    }
  } catch (error) {
    console.log(error);
  }
}

export default handler;
