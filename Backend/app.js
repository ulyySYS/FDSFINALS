const express = require('express');
const userRoutes = require('./routes/UserRoutes');
const maintenanceRequestRoutes = require('./routes/RequestRoutes');
const maintenanceLogsRoutes = require('./routes/LogsRoutes');
const roomsRoutes = require('./routes/RoomsRoutes');
const dormRoutes = require('./routes/DormBuildingRoutes');
const registrationRoutes = require('./routes/RegistrationsRoutes');
const paymentRoutes = require('./routes/PaymentsRoutes');

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors()); 

app.use('/login', userRoutes);
app.use('/users', maintenanceRequestRoutes);
app.use('/admin', userRoutes);
app.use('/admin', maintenanceRequestRoutes);
app.use('/admin', maintenanceLogsRoutes);
app.use('/admin', roomsRoutes);
app.use('/admin', dormRoutes);
app.use('/admin', registrationRoutes);
app.use('/admin', paymentRoutes);




module.exports = app;