import jwt from 'jsonwebtoken';

const checkAuthHeader = (req, res, next) => {
  // 1. Check token from headers
  const authorization = req.header('Authorization');
  if (!authorization) {
    return res.status(401).json({
      msg: 'Auth token missing.',
    });
  }

  const token = authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ msg: 'Invalid token.' });
  }

  try {
    // 2. verify the token
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = verifyToken.userId;
    req.userId = userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: 'Invalid token.' });
  }
};

export { checkAuthHeader };
