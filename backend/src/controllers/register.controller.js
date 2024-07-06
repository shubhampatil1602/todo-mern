import { z } from 'zod';
import { User } from '../models/user.model.js';

const userSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string().min(6, ['Password must be atleast 6 characters long.']),
});

const register = async (req, res) => {
  // Take details from body
  const { email, username, password } = req.body;

  // Validate using zod
  const validateBody = userSchema.safeParse({
    email,
    username,
    password,
  });

  // If validation fails, return error
  if (!validateBody.success) {
    return res
      .status(400)
      .json({
        errors: validateBody.error.issues.map((issue) => issue.message),
      });
  }

  try {
    // Check if user details already available in db
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        msg: 'User already exists.',
      });
    }

    // If new user, then add them to db
    const newUser = new User({
      email,
      username,
      password,
    });
    await newUser.save();
    return res.status(201).json({ msg: `Welcome ${username}!` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Server error.',
    });
  }
};

export { register };
