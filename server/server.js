import express, { json } from 'express';
import { createConnection } from 'mysql2';
import cors from 'cors';

const app = express()
app.use(json())
app.use(cors())

const db = createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test'
})

app.get('/products', (req, res) => {
  let query = "SELECT * FROM `Products`"
  db.query(query, (err, data) => {
    if (err) {
      res.status(400).send("cant get data")
    }
    res.status(200).json(data)
  })
})

app.post("/addproduct", (req, res) => {

  let { name, price, description } = req.body
  let query = "INSERT INTO `Products`(`name`, `price`, `description`) VALUES (?,?,?)"

  db.query(query, [name, price, description], (err, data) => {
    if (err) {
      res.status(400).send("error")

      console.log(err);
    }
    else {
      res.status(200).send("added")
    }
  })
})

app.delete('/deletprodect/:id', (req, res) => {
  const id = req.params.id

  let query = "DELETE FROM `Products` WHERE `id` = ?"

  db.query(query, [id], (err, data) => {
    if (err) {
      res.status(400).send("error")

      console.log(err);
    }
    else {
      res.status(200).send("deleted")
    }
  })
})

app.put('/updateproduct/:id', (req, res) => {
  const id = req.params.id;
  const { name, price, description } = req.body;
  const query = "UPDATE `Products` SET `name`=?, `price`=?, `description`=? WHERE `id` = ?";

  db.query(query, [name, price, description, id], (err, data) => {
    if (err) {
      res.status(400).send("error");
      console.log(err);
    } else {
      res.status(200).send("updated");
    }
  });
});

app.listen(3000, () => {
  console.log("server start at port 3000");
})