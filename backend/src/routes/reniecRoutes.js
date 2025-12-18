const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/:dni', async (req, res) => {
  const { dni } = req.params;

  try {
    const response = await axios.get(
      `https://api.decolecta.com/v1/reniec/dni`,
      {
        params: { numero: dni },
        headers: {
          Authorization: `Bearer ${process.env.DECOLECTA_TOKEN}`
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error RENIEC:', error.response?.data || error.message);
    res.status(500).json({
      ok: false,
      message: 'Error consultando RENIEC'
    });
  }
});

module.exports = router;
