const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./app/utils/db')
const userRoutes = require('./app/routes/userRoutes');
const reportRoutes = require('./app/routes/reportRoutes');
const clientRoutes = require('./app/routes/clientRoutes');
const path = require('path');
const cors = require('cors');

const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors())
connectDB();

const PORT = process.env.PORT || 8000;
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/reports', reportRoutes);
app.use('/clients', clientRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});