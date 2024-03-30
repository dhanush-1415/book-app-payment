const express = require('express');
const bodyParser = require('body-parser');
const paypal = require('@paypal/checkout-server-sdk');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors()); 

// Set up PayPal client
const Id = 'ARczUVWk1e-x6ejyg0HiZpTzhHrUOkwEFl5bEN603Re_g29aKHtH9QTc7OICazEmdXh0nAg-RSiIuCED';
const clientS = 'ELef53CDK1Q25iPsRcH68eAh5dLc4XLXx1s1wwo4DKkRPlb-ja-yQGdOnP_XkPnH-Kx6Tf2NmmMddo0f';

const environment = new paypal.core.SandboxEnvironment(Id, clientS);
const client = new paypal.core.PayPalHttpClient(environment);

// Define routes
app.post('/create-order', async (req, res) => {
  try {


    const products = req.body.dataArray; 

    const totalAmount = products.reduce((acc, product) => acc + product.SellingPrice * product.CartCount, 0);

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'SGD',
          value: totalAmount.toFixed(2)
        }
      }]
    });

    const response = await client.execute(request);
    res.json({ orderId: response.result.id });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to create order');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
