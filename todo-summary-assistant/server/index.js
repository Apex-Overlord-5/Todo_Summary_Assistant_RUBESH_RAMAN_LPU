import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/todos', todoRoutes);

app.get('/', (req, res) => {
  res.send('Todo Summary Assistant backend running');
});

// ✅ Test Slack webhook route
app.get('/test-slack', async (req, res) => {
  try {
    const slackService = await import('./services/slackService.js');
    await slackService.default.postToSlack('✅ Slack webhook is working!');
    res.send('Slack message sent successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Slack message failed');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
