import mongoose from "mongoose";
import express from "express";
import dbMessages from "./dbMessages.js";
import dbRooms from "./dbRooms.js";
import Pusher from "pusher";
import cors from "cors";
const app = express();
const port = process.env.PORT || 8080;
const pusher = new Pusher({
  appId: "1597786",
  key: "48316281dd4ad140e510",
  secret: "c92b732c60788acd9478",
  cluster: "ap2",
  useTLS: true,
});
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});
const Connection_url = `mongodb+srv://chat-connect:DtkjENTeSbEZS6Wz@cluster0.ztnrcfb.mongodb.net/chatBox?retryWrites=true&w=majority`;
mongoose.set("strictQuery", false);
mongoose
  .connect(Connection_url)
  .then(() => {
    app.listen(port, () => console.log(`listening on localhost:${port}`));
    console.log("connected to db");
  })
  .catch((error) => {
    console.log("error");
  });
const db = mongoose.connection;
db.once("open", () => {
  console.log("DB created");
  const roomCollection = db.collection("rooms");
  const changeStream = roomCollection.watch();

  changeStream.on("change", (change) => {
    console.log(change);
    if (change.operationType === "insert") {
      const roomDetails = change.fullDocument;
      pusher.trigger("room", "inserted", roomDetails);
    } else {
      console.log("Not a expected event to trigger");
    }
  });

  const msgCollection = db.collection("messages");
  const changeStream1 = msgCollection.watch();

  changeStream1.on("change", (change) => {
    console.log(change);
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", messageDetails);
    } else {
      console.log("Not a expected event to trigger");
    }
  });
});

app.post("/group/create", (req, res) => {
  const name = req.body.groupname;
  dbRooms.create({ name }, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(201).send(data);
    }
  });
});

app.post("/new/room", (req, res) => {
  const dbRoom = req.body;
  dbRooms.create(dbRoom, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/messages/find", (req, res) => {
  dbMessages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;
  dbMessages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
app.get("/all/rooms", (req, res) => {
  dbRooms.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
app.get("/room/:id", (req, res) => {
  dbRooms.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data[0]);
    }
  });
});
app.get("/messages/:id", (req, res) => {
  dbMessages.find({ roomId: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
