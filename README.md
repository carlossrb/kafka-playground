# Kafka Playground

It is a space to playaround with Kafka messaging system.

The repo already has a initial solution to manage notification messages between producers and subscribers (clients).

## Get to know about each available service

### products-service

Responsible for creating new products/seller and sending to **jaiminho-service**.

### jaiminho-service

Responsible for handling incoming messages from any producer and send to the right queue.

### client-billing-service

Responsible for listening incoming messages from a specific topic related to new products.

### client-auth-service

Responsible for listening incoming messages from specific topics related to new seller.

### client-idwall-service

Responsible for listening incoming messages from specific topics related to new products and seller.

## How to run

```
yarn install
docker-compose up
```

after, you need start each app to consumer its msgs

Be happy! 🍻
