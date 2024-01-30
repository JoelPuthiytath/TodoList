import TodoModal from "../models/todoitems.js";

const getTasks = async (req, res) => {
  try {
    const tasks = await TodoModal.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(501).send("internal server error:" + error.message);
  }
};

const addItems = async (req, res) => {
  console.log("inside the controller");
  const { todo } = req.body;
  console.log(req.body);
  try {
    const item = new TodoModal({
      _id: todo.id,
      task: todo.task,
      completed: todo.completed,
      isEditing: todo.isEditing,
    });
    const saveItem = await item.save();
    res.status(200).json({ message: "item added successfully", item });
  } catch (error) {
    res.status(501).send("internal server error:" + error.message);
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.query;
  console.log(req.query);
  try {
    const result = await TodoModal.deleteOne({ _id: id });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Task deleted successfully." });
    } else {
      res.status(404).json({ message: "Task not found." });
    }
  } catch (error) {
    res.status(500).send("Internal server error: " + error.message);
  }
};

const updateTask = async (req, res) => {
  const { id, task } = req.body;

  console.log(req.body);
  try {
    const result = await TodoModal.updateOne(
      { _id: id },
      { $set: { task: task } }
    );
    console.log(result);

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "Task updated successfully." });
    } else {
      res.status(404).json({ message: "Task not found or not modified." });
    }
  } catch (error) {
    res.status(500).send("Internal server error: " + error.message);
  }
};

export { addItems, deleteTask, updateTask, getTasks };
