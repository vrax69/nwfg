const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

const app = express();
app.use(cors());

// Configuración de certificados SSL
const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/nwfg.net/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/nwfg.net/fullchain.pem')
};

const db = mysql.createConnection({
  host: 'nwfg.net',
  user: 'admin',
  password: 'Usuario19.',
  database: 'rates_db'
});

db.connect((err) => {
  if (err) {
    console.error('Error conectando a MySQL:', err);
    return;
  }
  console.log('Conectado a la base de datos');
});

// Endpoint para obtener los datos de la tabla Rates
app.get('/api/rates', (req, res) => {
  const query = `
    SELECT 
      Rate_ID, 
      SPL_Utility_Name, 
      Product_Name, 
      Rate, 
      ETF, 
      MSF, 
      Company_DBA_Name, 
      duracion_rate, 
      DATE_FORMAT(Last_Updated, '%Y-%m-%d') AS Last_Updated,  
      SPL 
    FROM Rates
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).json({ error: 'Error al obtener datos' });
      return;
    }
    res.json(results);
  });
});

// 🔹 Nuevo endpoint para obtener datos de la vista `rates_view`
app.get('/api/rates/view', (req, res) => {
  const query = `
    SELECT 
      Rate_ID, 
      Standard_Utility_Name, 
      Product_Name, 
      Rate, 
      ETF, 
      MSF, 
      duracion_rate, 
      Company_DBA_Name, 
      DATE_FORMAT(Last_Updated, '%Y-%m-%d') AS Last_Updated,  
      SPL, 
      State, 
      LDC, 
      Logo_URL, 
      Service_Type, 
      Unit_of_Measure, 
      Excel_Status 
    FROM rates_view
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta en la vista:', err);
      res.status(500).json({ error: 'Error al obtener datos de la vista' });
      return;
    }
    res.json(results);
  });
});

const PORT = 3002;
// Crear servidor HTTPS
https.createServer(options, app).listen(PORT, () => {
  console.log(`Servidor HTTPS corriendo en https://nwfg.net:${PORT}`);
});
