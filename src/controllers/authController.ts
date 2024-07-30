import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';

// Define an interface for the request body
interface RegisterRequestBody {
  username: string;
  password: string;
}

export const register = async (req: Request<{}, {}, RegisterRequestBody>, res: Response) => {
  try {
    const { username, password } = req.body;
    
    // Create a user, TypeScript should infer the type correctly now
    const user = await User.create({ username, password });

    res.status(201).json({ 
      message: 'User registered successfully', 
      userId: user.id, 
      username: user.username 
    });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user', error });
  }
};

interface LoginRequestBody {
  username: string;
  password: string;
}

export const login = async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user || !(await user.isValidPassword(password))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};
