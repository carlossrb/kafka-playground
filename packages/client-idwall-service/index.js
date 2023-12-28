import KafkaClient from './lib/kafkaClient.js';

const kafkaClient = KafkaClient.create();
const consumer = kafkaClient.consumer({ groupId: 'client-idwall-group' });

process.on('SIGINT', async () => {
  console.info('SIGINT signal received.');
  await consumer.disconnect();
  process.exit(0);
});

(async () => {
  await consumer.connect();
  await consumer.subscribe({
    topics: ['kafka-playground-products-topic', 'kafka-playground-products-seller-topic'],
    fromBeginning: true
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const msgData = JSON.parse(message.value.toString());

      console.log('\nclient-idwall-service');
      console.log(`TOPIC: ${topic}`);
      console.log(msgData);
    }
  });
})();
