const express = require('express');
const router = express.Router();


/**
 * Health check route
 */
router.get('/', async (req, res) => {
    const healthCheckStatus = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now(),
    };

    try {
        res.send(healthCheckStatus);
    } catch (e) {
        healthCheckStatus.message = e
        res.status(503).send(healthCheckStatus);
    }
});

module.exports = router;
