import express from 'express';

const router = express.Router();

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Server is healthy!',
    timestamp: new Date().toISOString(),
  });
});

export default router;
