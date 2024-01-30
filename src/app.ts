import "reflect-metadata";
import express from "express";
import { DataSource } from "typeorm";
import { User } from "../src/entities/User";
import { UUID } from "typeorm/driver/mongodb/bson.typings";

const app = express();
app.use(express.json());
const port = 3000;

app.get("/", async (req, res) => {
  const userRepo = appDatasource.getRepository(User);
  //Fina all the Records
  const allRecords = await userRepo.find();
  res.json({
    data: {
      allRecords,
    },
  });
});

app.get("/filter", async (req, res) => {
  const userRepo = appDatasource.getRepository(User);
  const Filter = await userRepo.find({
    where: {
      firstName: "Subham",
      lastName: "Joshi",
    },
  });
  res.json({
    data: {
      Filter,
    },
  });
});

app.delete("/", async (req, res) => {
  const userRepo = appDatasource.getRepository(User);

  const deleteuser = await userRepo.delete(2);
  res.send("Delete User");
});

app.post("/", async (req, res) => {
  const userRepo = appDatasource.getRepository(User);

  let user: User = new User();
  user.email = "xtmeop@gmail.com";
  user.firstName = "subu";
  user.lastName = "world";
  const userInserted = await userRepo.save(user);
  res.json(userInserted);
});

app.patch("/", async (req, res) => {
  const userRepo = appDatasource.getRepository(User);
  const updated = await userRepo.update(3, {
    firstName: "Subham Updated",
    lastName: "Joshi Updated",
    email: "subhamrajjoshi@gmail.com",
  });
  res.json(updated);
});

const appDatasource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "admin",
  database: "newtype_db",
  entities: ["src/entities/*{.ts,.js}"],
  synchronize: true,
  logging: true, //show information of typeorm in the console or terminal
});

appDatasource
  .initialize()
  .then(() => {
    console.log("Database is connected");
    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
