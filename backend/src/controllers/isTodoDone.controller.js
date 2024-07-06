import { Todo } from '../models/todo.model.js';

const isTodoDone = async (req, res) => {
  // 1. Check token from headers
  // 2. verify the token

  try {
    // 3. Extract Todo ID from request body (fe -> deleteBtn(id))
    const todoId = req.body.todoId;
    if (!todoId) {
      return res.status(400).json({ msg: 'Todo ID is required.' });
    }
    // 4. Find the todo by its ID
    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({ msg: 'Todo not found.' });
    }

    // 5. Toggle the `isCompleted` field
    todo.isCompleted = !todo.isCompleted;

    // 6. Save the updated todo
    await todo.save();

    return res
      .status(200)
      .json({ msg: `${todo.isCompleted ? 'Done' : 'Pending'}` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error.' });
  }
};

export { isTodoDone };
