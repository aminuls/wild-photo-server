const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

// middle ware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
   res.send("Wild Photo Server is Running");
});
// Database
const uri = process.env.DB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
   try {
      const serviceCollection = client.db("wild-photo").collection("services");
      app.get("/servehome", async (req, res) => {
         const query = {};
         const serviceHome = await serviceCollection.find(query).limit(3).toArray();
         res.send(serviceHome);
      });
      app.get("/services", async (req, res) => {
         const query = {};
         const serviceHome = await serviceCollection.find(query).toArray();
         res.send(serviceHome);
      });
   } finally {
   }
}

run().catch((err) => console.error(err));

app.listen(port, () => {
   console.log(`Wild Photo server is running on Port ${port}`);
});
