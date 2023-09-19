const bcrypt = require('bcrypt');

// Import your Sequelize models here
const { User } = require('../models'); // Import the User model

module.exports = {
  async signup(req, res) {
    try {
      const { username, email, password } = req.body;

      // Check if the email is already registered
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).send({ message: 'Email already registered' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = await User.create({ username, email, password: hashedPassword });

      // You can implement JWT token generation for authentication here

      res.status(201).send({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).send({ message: 'Signup failed' });
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Find the user by email
      const user = await User.findOne({ where: { email } });

      // Check if the user exists
      if (!user) {
        return res.status(401).send({ message: 'Invalid credentials' });
      }

      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).send({ message: 'Invalid credentials' });
      }

      // You can implement JWT token generation for authentication here

      res.status(200).send({ message: 'Login successful', user });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).send({ message: 'Login failed' });
    }
  },
};

