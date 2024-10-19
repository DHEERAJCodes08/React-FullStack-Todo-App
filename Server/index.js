// npm init  -y
// npm i express cors pg
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//Estabalishing the Database Connection
pool.connect(function (res, err) {
  try {
    console.log("database connection established");
  } catch (err) {
    console.log(err);
  }
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});

app.get("/", (req, res) => {
  res.send("Welcome");
});
//Routes

//create an Todo

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;

    const todoinsert = {
      text: "INSERT INTO todo (description) VALUES($1)", // Correct spelling: 'description'
      values: [description],
    };

    const createtodo = await pool.query(todoinsert);

    // Send success response if the insertion is successful
    res.status(200).json({ message: "Todo added successfully!", createtodo });
  } catch (error) {
    console.error(error.message);

    // Send error response if there is an issue
    res.status(500).json({ error: "Failed to add todo. Please try again." });
  }
});

// get all Todos

app.get("/todos", async (req, res) => {
  try {
    const getalltodo = await pool.query("Select * from todo");
    res.json(getalltodo.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500);
  }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("Delete from todo where todo_id = $1", [
      id,
    ]);
    res.status(200).json({ message: "Todo was deleted" });
  } catch (error) {
    console.log(error.message);
  }
});

//Edit an Todo

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  try {
    const updatedTodo = await pool.query(
      "Update todo SET description = $1 Where todo_id = $2",
      [ description,id]
    );

    console.log("Todo was Succesfully Updated");
    res.status(200).json({ message: "Todo was successfully updated" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error in updating Todo" });
  }
});
