import express from 'express';
import jwt from 'jsonwebtoken';
import { getNotes, addNote, updateNote, deleteNote } from '../controllers/notes.controller.js';

const userRouter = express.Router();

const secretKey = "NotesApp4242";

const authMiddleware = (req, res, next) => {
    // Extract the token from the Authorization header
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Missing token' });
    }

    // Verify the token
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        // If the token is valid, extract user ID from the payload and attach it to the request object
        req.userId = decoded.user;
        next();
    });
};

userRouter.use(authMiddleware);

userRouter.get('/notes', getNotes);
userRouter.post('/notes', addNote);
userRouter.put('/notes', updateNote);
userRouter.delete('/notes', deleteNote);

export default userRouter;


