// backend/controllers/microtask_controller.js
const fetch = require('node-fetch'); // if using node 18+ you can use global fetch
const MICROSERVICE_URL = process.env.MICROSERVICE_URL || 'http://microservice:8001';

/**
 * Enqueue a chat processing task in the Python microservice.
 * Returns { queued: true, task_id }
 */
async function enqueueChatProcessing(req, res) {
  const { userId, message } = req.body;
  if (!userId || !message) return res.status(400).json({ error: 'userId and message required' });

  try {
    const resp = await fetch(`${MICROSERVICE_URL}/tasks/process_chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, message })
    });
    const data = await resp.json();
    // optional: save task_id with the Chat doc in Mongo here
    return res.status(202).json({ queued: true, task_id: data.task_id });
  } catch (err) {
    console.error('enqueueChatProcessing error', err);
    return res.status(500).json({ error: 'failed to enqueue task' });
  }
}

/**
 * Check task status by task id.
 */
async function getTaskStatus(req, res) {
  const { taskId } = req.params;
  if (!taskId) return res.status(400).json({ error: 'taskId required' });

  try {
    const resp = await fetch(`${MICROSERVICE_URL}/tasks/${taskId}`);
    const data = await resp.json();
    return res.json(data);
  } catch (err) {
    console.error('getTaskStatus error', err);
    return res.status(500).json({ error: 'failed to fetch task status' });
  }
}

module.exports = { enqueueChatProcessing, getTaskStatus };
