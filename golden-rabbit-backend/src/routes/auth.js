const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_replace_me';
const SALT_ROUNDS = 10;

// Register: creates a user in Postgres users table
router.post('/register', async (req, res, next) => {
  try {
    const { email, password, full_name } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email and password required' });

    if (!pool) return res.status(500).json({ error: 'Database not configured' });

    // check existing
    const exists = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (exists.rows.length) return res.status(409).json({ error: 'Email already registered' });

    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const insertQuery = 'INSERT INTO users (email, password_hash, full_name) VALUES ($1, $2, $3) RETURNING id, email, full_name, created_at';
    const { rows } = await pool.query(insertQuery, [email, hashed, full_name || null]);
    const user = rows[0];

    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
});

// Login: validate user and return JWT
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email and password required' });

    if (!pool) return res.status(500).json({ error: 'Database not configured' });

    const selectQuery = 'SELECT id, email, password_hash FROM users WHERE email = $1 LIMIT 1';
    const { rows } = await pool.query(selectQuery, [email]);
    const user = rows[0];
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    // create access token (short lived) and refresh token (stored in DB)
    const accessToken = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = require('crypto').randomBytes(48).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    await pool.query('INSERT INTO refresh_tokens (token, user_id, expires_at) VALUES ($1, $2, $3)', [refreshToken, user.id, expiresAt]);

    res.json({ accessToken, refreshToken, expiresIn: 15 * 60 });
  } catch (err) {
    next(err);
  }
});

// Refresh endpoint: exchange refresh token for new access token
router.post('/refresh', async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ error: 'refreshToken required' });
    if (!pool) return res.status(500).json({ error: 'Database not configured' });

    const q = 'SELECT rt.id, rt.expires_at, u.id as user_id, u.email FROM refresh_tokens rt JOIN users u ON u.id = rt.user_id WHERE rt.token = $1 LIMIT 1';
    const { rows } = await pool.query(q, [refreshToken]);
    const row = rows[0];
    if (!row) return res.status(401).json({ error: 'Invalid refresh token' });
    if (new Date(row.expires_at) < new Date()) {
      // token expired - remove it
      await pool.query('DELETE FROM refresh_tokens WHERE id = $1', [row.id]);
      return res.status(401).json({ error: 'Refresh token expired' });
    }

    const accessToken = jwt.sign({ sub: row.user_id, email: row.email }, JWT_SECRET, { expiresIn: '15m' });
    res.json({ accessToken, expiresIn: 15 * 60 });
  } catch (err) {
    next(err);
  }
});

// Logout: remove refresh token
router.post('/logout', async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ error: 'refreshToken required' });
    if (!pool) return res.status(500).json({ error: 'Database not configured' });
    await pool.query('DELETE FROM refresh_tokens WHERE token = $1', [refreshToken]);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
