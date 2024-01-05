const User = require('../models/user');
const { generateToken, hashPassword, comparePasswords } = require('../utils/auth');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.createUser = async (req, res) => {
    const { email, password, firstname, lastname, address, phone } = req.body;

    try {
        const hashedPassword = await hashPassword(password);
        const newUser = new User({ email, password: hashedPassword, firstname, lastname, address, phone });
        await newUser.save();
        const token = generateToken(newUser);
        res.status(201).json({ user: newUser, token });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'User not exist!' });
        }

        const passwordMatch = await comparePasswords(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateToken(user);
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};