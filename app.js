const express = require('express');
const promClient = require('prom-client');

const app = express();
const port = process.env.PORT || 8080;

// Create a Registry to register the metrics
const register = new promClient.Registry();

// Enable the collection of default metrics
promClient.collectDefaultMetrics({ register });

const helloWorldCounter = new promClient.Counter({
    name: 'root_access_total',
    help: 'Total number of accesses to the root path',
});
register.registerMetric(helloWorldCounter);



// Define routes
app.get('/my-app', (req, res) => {
    helloWorldCounter.inc();
    res.send('Hello, World!');
});

app.get('/about', (req, res) => {
    res.send('This is a sample Node.js application for Kubernetes deployment testing.');
});

app.get('/ready', (req, res) => {
    res.status(200).send('Ready');
});

app.get('/live', (req, res) => {
    res.status(200).send('Alive');
});

app.get('/classified', (req, res) => {
    res.status(200).send('You should not be here!!!');
});

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const openapiDocument = YAML.load(path.join(__dirname, 'openapi.yaml'));

// Serve raw YAML file
app.get('/openapi.yaml', (req, res) => {
  res.sendFile(path.join(__dirname, 'openapi.yaml'));
});

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));

// 👇 Only listen when run directly, not when required in test

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

module.exports = app;
