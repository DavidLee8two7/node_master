const express = require('express');
const router = express.Router();

// Do work here
router.get('/', (req, res) => {
  const david = { name: 'David', age: 1, cool: true };
  // res.send('Hey! It works!');
  // res.json(david);
  // res.send(req.query.name);
  // res.json(req.query);
  res.render('hello', {
    name: 'David',
    dog: req.query.dog
  })
});

router.get('/reverse/:name', (req, res) => {
  const reverse = [...req.params.name].reverse().join('');
  res.send(reverse);
})

module.exports = router;
