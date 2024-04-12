const express = require('express');
const authRouter = express.Router();
const {register, login} = require('../../controllers/auth/auth.controller');

authRouter.post('/login', login);
authRouter.post('/register', register);

module.exports = authRouter;
