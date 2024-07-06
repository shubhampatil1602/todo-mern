import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, ['Password must be atleast 6 characters long.']),
});

const login = async (req, res) => {
  // Take details from body
  const { email, password } = req.body;

  // Validate using zod
  const validateBody = userSchema.safeParse({
    email,
    password,
  });

  // If validation fails, return error
  if (!validateBody.success) {
    return res.status(400).json({ msg: 'Invalid Credentials.' });
  }

  try {
    // Check if user details already available in db
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: 'User does not exist.',
      });
    }

    // Check if password is correct
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ msg: 'Invalid password.' });
    }

    // If he/she is a registered user then, sign with jwt
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      }
    );

    // Store the jwt token in cookie
    res.cookie('auth_token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1d
      secure: process.env.NODE_ENV === 'production',
    });

    return res.status(200).json({
      msg: `Welcome back ${user.username}!`,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Server error.',
    });
  }
};

export { login };
