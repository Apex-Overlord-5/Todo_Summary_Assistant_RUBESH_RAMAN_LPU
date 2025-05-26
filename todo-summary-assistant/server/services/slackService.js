// server/services/slackService.js

import axios from 'axios';

async function postToSlack(message) {
  const webhook = process.env.SLACK_WEBHOOK_URL;

  if (!webhook) {
    console.error('Slack webhook URL is missing in .env');
    throw new Error('no_service');
  }

  try {
    const response = await axios.post(webhook, { text: message });
    if (response.status !== 200) {
      throw new Error(`Slack response status: ${response.status}`);
    }
    return true;
  } catch (err) {
    console.error('Slack post error:', err.response?.data || err.message);
    throw new Error('Failed to send message to Slack');
  }
}

export default { postToSlack };
