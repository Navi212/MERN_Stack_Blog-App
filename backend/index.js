// Entry point to App
const express = require('express');
const authRouter = require('./routes/authRoute');
const blogRouter = require('./routes/blogRoute');
const courseRouter = require('./routes/courseRoute');
const dsaRouter = require('./routes/dsaRoute');
const tutorialRouter = require('./routes/tutorialRoute');
const webTechRouter = require('./routes/webTechRoute');
const { errorHandler } = require('./middlewares/errorHandler');

// Initialize app
const app = express();

// Parse json payloads
app.use(express.json());

// Load routers for app endpoints
app.use('/v1/api/users', authRouter);
app.use('/v1/api/blogs', blogRouter);
app.use('/v1/api/courses', courseRouter);
app.use('/v1/api/dsas', dsaRouter);
app.use('/v1/api/tutorials', tutorialRouter); // Done
app.use('/v1/api/webtechs', webTechRouter);

// For non existent route
app.get('*', (req, res) =>
  res.status(404).json({ success: false, message: 'Route does not exist' })
);

// Load custom errorHandler to catch all errors
app.use(errorHandler);

// Export app
module.exports = app;
