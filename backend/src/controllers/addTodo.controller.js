import { z } from 'zod';
import { Todo } from '../models/todo.model.js';
import { User } from '../models/user.model.js';

const todoSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const addTodo = async (req, res) => {
  // 1. Check token from headers
  // 2. verify the token
  try {
    const userId = req.userId;

    // 3. Take details from body and verify using zod
    const { title, description } = req.body;
    const validateBody = todoSchema.safeParse({
      title,
      description,
    });

    // If validation fails, return error
    if (!validateBody.success) {
      return res.status(400).json({
        errors: validateBody.error.issues.map((issue) => issue.message),
      });
    }

    // 4. Add todo to db
    // 4.1 Create new todo
    const newTodo = new Todo({
      title,
      description,
      createdBy: userId,
    });

    // 4.2 Save the new todo
    await newTodo.save();

    // 4.3 Add todo reference to user's todo array
    await User.findByIdAndUpdate(userId, {
      $push: {
        todos: newTodo._id,
      },
    });

    return res.status(201).json({
      msg: 'Todo added successfully!',
      todo: newTodo,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
};

export { addTodo };
