const express = require('express');
const client = require('prom-client');

const app = express();
const PORT = 5000;

// Hide Express information
app.disable('x-powered-by');

// Prometheus metrics registry
const register = new client.Registry();

client.collectDefaultMetrics({
    register
});

// HTTP request counter
const requestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests'
});

register.registerMetric(requestCounter);

// Count HTTP requests
app.use((req, res, next) => {
    requestCounter.inc();
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        service: 'chat-backend'
    });
});

// Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

// Root endpoint
app.get('/', (req, res) => {
    res.send('Backend running');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Export the app for testing purposes 
module.exports = app