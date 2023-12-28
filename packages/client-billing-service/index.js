import KafkaClient from './lib/kafkaClient.js';

const kafkaClient = KafkaClient.create();
const consumer = kafkaClient.consumer({ groupId: 'client-billing-group' });

process.on('SIGINT', async () => {
  console.info('SIGINT signal received.');
  await consumer.disconnect();
  await producer.disconnect();
  process.exit(0);
});

(async () => {
  await consumer.connect();
  await consumer.subscribe({
    topics: ['kafka-playground-products-topic'],
    fromBeginning: true
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const msgData = JSON.parse(message.value.toString());

      console.log('\nclient-billing-service');
      console.log(`productId: ${msgData.productId}\nsku: ${msgData.sku}`);
    }
  });
})();
