import { Todo } from '../models/todo.model.js';

const showTodos = async (req, res) => {
  // 1. Check token from headers
  // 2. verify the token (done by middleware)
  try {
    const userId = req.userId;

    // 3. Get todos from db (only created by users)
    const todos = await Todo.find({ createdBy: userId });

    res.json({ todos });
  } catch (error) {
    console.log(error);
  }
};

export { showTodos };

// const user = await User.findOne({
//   _id: userId,
// });

// if (!user) {
//   return res.status(400).json({
//     msg: 'User does not exist.',
//   });
// }

// const todos = await Todo.find({
//   _id: {
//     $in: user.todos,
//   },
// });
