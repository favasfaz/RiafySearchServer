const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const db = require('./config/connection');
const routes = require('./routes/routes');
const limiter = require('./middlewares/rateLimiter')
const catchErrors = require('./middlewares/errorMiddleware')
require('dotenv').config();

const app = express();

app.use(cors());
app.use(limiter);
app.use(helmet());
app.use('/api', routes);
app.use(catchErrors)

app.all("*", (req, res) => {
  res.status(404).json({
    status: "false",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

const PORT = process.env.PORT || 5000;

db.connect((err) => {
  if (err) console.log(`Database Connection Error ${err}`);
  else console.log('database Connected Successfully');
});

app.listen(PORT, (err) => {
  if (err) console.log(`Server failed to connect  ${err}`);
  else console.log(`Server Running on Port: http://localhost:${PORT}`);
});
