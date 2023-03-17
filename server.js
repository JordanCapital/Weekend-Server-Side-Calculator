const express = require('express');
const app = express();
app.use(express.static('public'))
// Middleware to parse JSON data
app.use(express.json());

// Data object to store calculation history
const history = [];
console.log('inside history', history);

// Route to handle POST request
app.post('/calculate', function(req, res) {
  // Extract input values from request body
  const num1 = req.body.num1;
  const num2 = req.body.num2;
  const operation = req.body.operation;

  // Validate input values
  if (isNaN(num1) || isNaN(num2)) {
    res.status(400).send('Invalid input');
    return;
  }

  // Perform calculation
  let result;
  switch (operation) {
    case 'add':
      result = num1 + num2;
      break;
    case 'subtract':
      result = num1 - num2;
      break;
    case 'multiply':
      result = num1 * num2;
      break;
    case 'divide':
      result = num1 / num2;
      break;
    default:
      res.status(400).send('Invalid operation');
      return;
  }

  // Store calculation in history
  const calculation = {
    num1: num1,
    num2: num2,
    operation: operation,
    result: result
  };
  history.push(calculation);
  console.log('inside calculations');

  // Send response
  res.status(200).send('OK');
});

// Route to handle GET request for history
app.get('/history', function(req, res) {
  res.send(history);
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, function() {
  console.log(`Server started on port ${PORT}`);
});
