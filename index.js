require('dotenv').config(); // Load .env

const express = require('express');
const app = express();
const db = require('./models');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/komik', async (req, res) => {
  const data = req.body;
  try {
    const komik = await db.Komik.create(data);
    res.status(201).json(komik);
  } catch (error) {
    console.error('🔥 Error saat insert komik:', error); // Tambahkan ini
    res.status(500).json({ 
      error: 'Failed to create komik', 
      message: error.message 
    });
  }
});


app.get('/komik', async (req, res) => {
  try {
    const komik = await db.Komik.findAll();
    res.status(200).json(komik);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve komiks' });
  }
});

app.put('/komik/:id', async (req, res) => {
  const komikId = req.params.id;
  const data = req.body;
  try {
    const komik = await db.Komik.findByPk(komikId);
    if (!komik) {
      return res.status(404).json({ error: 'Komik not found' });
    }
    await komik.update(data);
    res.status(200).json(komik);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update komik' });
  }
});

app.delete('/komik/:id', async (req, res) => {
  const komikId = req.params.id;
  try {
    const komik = await db.Komik.findByPk(komikId);
    if (!komik) {
      return res.status(404).json({ error: 'Komik not found' });
    }
    await komik.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete komik' });
  }
});

// Jalankan server setelah DB siap
db.sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection error:', err);
  });
