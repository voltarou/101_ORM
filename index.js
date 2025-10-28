const express = require('express');
const app = express();
const db = require('./models');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

db.sequelize.sync().then((result) => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}).catch((err) => {
    console.log(err);
});