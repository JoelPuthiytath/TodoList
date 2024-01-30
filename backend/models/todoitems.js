import mongoose from "mongoose";

const TodoItemSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  isEditing: {
    type: Boolean,
    required: true,
  },
});

const TodoModal = mongoose.model("TodoItems", TodoItemSchema);
export default TodoModal;
