var express = require("express");
var router = express.Router();
const db = require("../collection");

/* POST todo . */
router.post("/details", async (req, res) => {
  const { name, email, phone } = req.body;
  const newtodo = await db.query(
    "INSERT INTO todo_list (name, email, phone) VALUES($1,$2,$3) RETURNING *",
    [name, email, phone]
  );
  res.status(200).json(newtodo.rows);
});
/* GET todo listing. */
router.get("/details", async (req, res) => {
  const alltodos = await db.query("SELECT * FROM todo_list");
  res.status(200).json(alltodos.rows);
});

/* GET single todo listing. */
router.get("/details/:id", async (req, res) => {
  const { id } = req.params;
  const alltodos = await db.query("SELECT * FROM todo_list WHERE id = $1", [
    id,
  ]);
  res.status(200).json(alltodos.rows);
});

/* PUT single todo listing. */
router.put("/details/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const updatedTodo = await db.query(
    "UPDATE todo_list SET name = $1, email = $2, phone = $3 WHERE id = $4",
    [name, email, phone, id]
  );
  res.status(201).json({ message: "successfully updated todo" });
});
/* DELETE todo listing. */
router.delete("/details/:id", async (req, res) => {
  const { id } = req.params;
  const del = await db.query("DELETE FROM todo_list WHERE id = $1", [id]);
  res.status(200).json({ msg: "SUccessfully Deleted todo" });
});

module.exports = router;
