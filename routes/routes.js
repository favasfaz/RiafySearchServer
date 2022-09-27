const express = require('express');
const db = require('../config/connection');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    await db.get().collection('Stocks').find({}).toArray((err, results) => {
      if (err) return res.json(err);
      return res.status(200).json(results);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

module.exports = router;
