import express from 'express';
import { uuid } from 'uuidv4';
import axios from 'axios';

const app = express();
const products = [];

app.use(express.json());

app.post('/products', async (req, res) => {
  const newProduct = {
    id: uuid(),
    ...req.body 
  };
  products.push(newProduct);
  console.log('Created new PRODUCT', newProduct.id);

  const newMsg = {
    metadata: {
      topic: 'kafka-playground-products-topic'
    },
    data: newProduct
  };

  await axios.post('http://localhost:7000/message', newMsg);

  res.status(201).send({ id: newProduct.id });
});

app.get('/products', (req, res) => {
  res.send(products);
});

app.post('/products/:productId/sellers', async (req, res) => {
  const product = products.find(p => p.id === req.params.productId);

  if (!product) {
    return res.sendStatus(404);
  }

  if (!product.sellers) {
    product.sellers = [];
  }

  product.sellers.push(req.body);
  console.log('Added new SELLER to PRODUCT', product.id);

  const newMsg = {
    metadata: {
      topic: 'kafka-playground-products-seller-topic'
    },
    data: {
      productId: product.id,
      ...req.body
    }
  };

  await axios.post('http://localhost:7000/message', newMsg);

  res.sendStatus(201);
});

app.get('/products/:productId/sellers', (req, res) => {
  const product = products.find(p => p.id === req.params.productId);

  if (!product || !product.sellers) {
    return res.sendStatus(404);
  }

  res.send(product.sellers);
});

app.listen(7001, () => {
  console.log('Product service is running on port 7001');
});
