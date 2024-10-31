const userModel = require("../models/user.model");
const patientModel = require("../models/patient.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// env varialbes
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

// register
const register = async (req, res) => {
  const { email, username, password, birthDate } = req.body;

  if (!email || !username || !password)
    return res.status(400).json({
      message: "Email, username and password are required!",
    });

  // check if email or username already exists
  const duplicateEmail = await userModel.findOne({ email });
  const duplicateUsername = await userModel.findOne({ username });

  if (duplicateEmail || duplicateUsername)
    return res.status(409).json({ message: "User already exists!" });

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
      email: email,
      username: username,
      password: hashedPassword,
      birthDate: birthDate,
    };

    const { password, ...data } = await patientModel.create(user);
    return res
      .status(201)
      .json({ data, message: "User created successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(401).json({ error: "Invalid password" });

    const accessToken = jwt.sign({ userId: user._id }, ACCESS_TOKEN_SECRET, {
      expiresIn: "15s",
    });
    const newRefreshToken = jwt.sign(
      { userId: user._id },
      REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // saving refresh token with current user
    const updatedUser = await userModel.findByIdAndUpdate(
      user._id,
      { refreshToken: newRefreshToken },
      { new: true }
    );

    if (updatedUser) {
      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      const { password, refreshToken, ...rest } = updatedUser.toObject();
      return res.status(200).json({ user: rest, accessToken });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// refresh token
const refreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = await userModel.findOne({ refreshToken });
  if (!foundUser) return res.sendStatus(403);

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser._id != decoded.userId) return res.sendStatus(403);
    const accessToken = jwt.sign(
      { userId: foundUser._id },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "15s" }
    );
    return res.status(200).json({ accessToken });
  });
};

// logout
const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // no content
  const refreshToken = cookies.jwt;

  // is refreshToken in db?
  const foundUser = await userModel.findOne({ refreshToken });
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  // delete refreshToken in db
  await userModel.findByIdAndUpdate(foundUser._id.toString(), {
    refreshToken: "",
  });

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  return res.sendStatus(204);
};

module.exports = { register, login, refreshToken, logout };
