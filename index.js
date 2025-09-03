import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/todo3';
const dbName = process.env.DATABASE_NAME || 'todo3';
mongoose.connect(mongoUri, {
  dbName,
});

// Task schema
const taskSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
  userId: String,
});
const Task = mongoose.model('Task', taskSchema);

// Basic CRUD routes
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find({ userId: req.query.userId });
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// OAuth 2.0 stub (to be implemented)
app.post('/auth/google', (req, res) => {
  // Тут буде логіка Google OAuth
  res.json({ token: 'stub-token', userId: 'stub-user' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
