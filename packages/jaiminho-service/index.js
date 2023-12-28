import express from 'express';
import KafkaClient from './lib/kafkaClient.js';

const app = express();
const kafkaClient = KafkaClient.create();
const producer = kafkaClient.producer();

process.on('SIGINT', async () => {
  console.info('SIGINT signal received.');
  await producer.disconnect();
  process.exit(0);
});

app.use(express.json());

app.post('/message', async (req, res) => {
  await producer.send({
    topic: req.body.metadata.topic,
    messages: [{ value: JSON.stringify(req.body.data) }]
  });

  res.sendStatus(202);
});

app.listen(7000, async () => {
  await producer.connect();
  console.log('app is running on port 7000');
});
