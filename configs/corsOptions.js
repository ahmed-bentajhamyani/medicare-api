const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
  origin: allowedOrigins,
  credentials: true, // Allow credentials (cookies) to be sent
};

module.exports = corsOptions;
