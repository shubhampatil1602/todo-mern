import { User } from '../models/user.model.js';
import { Todo } from '../models/todo.model.js';

export const deleteTodo = async (req, res) => {
  // 1. Check token from headers
  // 2. verify the token

  try {
    const userId = req.userId;

    // 3. Extract Todo ID from request body (fe -> deleteBtn(id))
    const todoId = req.body.todoId;
    if (!todoId) {
      return res.status(400).json({ msg: 'Todo ID is required.' });
    }
    // 4. Verify Todo Ownership
    const todo = await Todo.findOne({ _id: todoId, createdBy: userId });
    if (!todo) {
      return res.status(404).json({ msg: 'Todo not found or unauthorized.' });
    }
    // 5. Delete the todo from `todos` collection
    await Todo.findByIdAndDelete(todoId);

    // 6. Remove the todo reference from user's `todos` array
    await User.findByIdAndUpdate(userId, {
      $pull: {
        todos: todoId,
      },
    });

    return res.status(200).json({ msg: 'Todo deleted successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error.' });
  }
};
