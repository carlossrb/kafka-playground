import { Kafka } from 'kafkajs';

const CLIENT_ID = 'kafka-playground';
const BROKERS_URL = ['localhost:29092'];

export default class KafkaClient extends Kafka {
  kafkaClient;

  constructor(clientId, brokers) {
    super({
      clientId: clientId,
      brokers: brokers
    });
  }

  static create(clientId = CLIENT_ID, brokers = BROKERS_URL) {
    this.kafkaClient = new KafkaClient(clientId, brokers);
    return this.kafkaClient;
  }
}
