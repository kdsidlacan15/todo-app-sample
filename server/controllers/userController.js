const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//create token
const createToken = (email) => {
  return jwt.sign({ email }, process.env.SECRET, { expiresIn: '1hr' });
};

// Sigup
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  const saltRounds = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  try {
    const signup = await pool.query(
      `INSERT INTO users (email, hashed_password) VALUES ($1, $2)`,
      [email, hashedPassword]
    );

    const token = createToken(email);

    res.json({ email, token });
  } catch (err) {
    console.error(err);
    if (err) {
      res.json({ detail: err.detail });
    }
  }
};

// login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    if (!user.rows.length) {
      return res.json({ detail: 'User does not exists' });
    }

    const success = await bcrypt.compare(
      password,
      user.rows[0].hashed_password
    );
    if (success) {
      const token = createToken(email);
      res.json({ email: user.rows[0].email, token });
    } else {
      res.json({ detail: 'Login Failed' });
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  signupUser,
  login,
};
