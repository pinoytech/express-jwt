require("dotenv").config();

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());

const profiles = [
  {
    username: "mike",
    firstname: "Mike",
    lastname: "Owens",
  },
  {
    username: "jay",
    firstname: "Jay",
    lastname: "Summers",
  },
];

// Database!?!?
let refreshTokens = [];

/**
 * Refreshes the token if a valid refresh token has been sent
 */
app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);

  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, username) => {
      if (err) return res.sendStatus(403);

      const accessToken = generateToken({ username: username.username });

      res.json({ accessToken: accessToken });
    }
  );
});

/**
 * Logout the user by removing the refresh token from the cache(probably better to store in a database)
 */
app.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});

/**
 * Authenticated user should be able to access this
 */
app.get("/profile", authenticateToken, (req, res) => {
  res.json(
    profiles.find((profile) => profile.username === req.profile.username)
  );
});

/**
 * Login user with a username
 */
app.post("/login", (req, res) => {
  // Authenticate
  const username = req.body.username;
  const profile = { username: username };

  const accessToken = generateToken(profile);
  const refreshToken = generateToken(profile, true);

  refreshTokens.push(refreshToken);

  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

/**
 * Middleware to chek user that's logged in by checking the authorization header
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) return res.sendStatus(403);

    req.profile = data;

    next();
  });
}

/**
 * Generate Access token or Refresh token
 */
function generateToken(user, refresh = false) {
  if (refresh) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  } else {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "30s",
    });
  }
}

app.listen(3000);
