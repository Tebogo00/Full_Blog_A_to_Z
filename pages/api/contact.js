import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      return res.status(422).json({ message: "Invalid input." });
    }

    const newMessage = {
      email,
      name,
      message,
    };

    let client;

    const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.kzijumt.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

    try {
      client = await MongoClient.connect(connectionString);
      const db = client.db();

      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;

      client.close();

      return res
        .status(201)
        .json({ message: "Successfully stored message!", data: newMessage });
    } catch (error) {
      if (client) {
        client.close();
      }
      console.error(error);
      return res.status(500).json({ message: "Storing message failed!" });
    }
  }
}

export default handler;
