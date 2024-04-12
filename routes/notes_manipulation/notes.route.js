const express = require('express');
const jwt = require('jsonwebtoken');
const userRouter = express.Router();

const secretKey = "NotesApp4242";

const {
    getNotes,
    UpdateNote,
    deleteNote,
    addNote
} = require('../../controllers/notes_manipulation/notes.controller');

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

userRouter.get('/get_notes', getNotes);
userRouter.post('/add_note', addNote);
userRouter.post('/update_note', UpdateNote);
userRouter.delete('/delete_note', deleteNote);

module.exports = userRouter;


