import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/user.model.js';

const secretKey = "NotesApp4242"

export const register = async (req, res) => {
    try{
        
        const { name, email, password } = req.body;
        let existingUser = await User.findOne({ email });

        if(name.length < 3){
            res.status(400).json({ message: 'Name must be at least 3 characters long' });
        }
        else if (password.length < 8 || !password.match(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
            res.status(400).json({ message: 'Password must be at least 8 characters long and alphanumeric' });
        }
        else if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
        }
        else{
             // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user
            const newUser = new User({
                name,
                email,
                password: hashedPassword
            });

            // Save the user to the database
            await newUser.save();

            // Generate JWT token
            const token = jwt.sign({ user: newUser._id }, secretKey, { expiresIn: '730h' });

            res.status(200).json({message: 'User Registered Successfully', token : token});
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({ message: 'Invalid email' });
        }
        else{
            const validPassword = await bcrypt.compare(password, user.password);

            if(!validPassword){
                res.status(400).json({ message: 'Invalid password' });
            }
            else{
                const token = jwt.sign({ user: user._id }, secretKey, { expiresIn: '730h' });
                res.status(200).json({ message: 'Login Successful', token });
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};