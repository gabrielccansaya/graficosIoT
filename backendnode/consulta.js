const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const db = require('./db'); // Asegúrate de que la ruta sea correcta

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/dat', (req, res) => {
  db.query('SELECT * FROM estacion_inictel', (err, results) => {
    if (err) {
      console.error('Error realizando la consulta: ' + err.stack);
      res.status(500).send('Error realizando la consulta');
      return;
    }
    
    const data = {
      oxNitroso: [],
      porcOxNitroso: [],
      voltOxNitroso: [],
      metano: [],
      porcMetano: [],
      voltMetano: [],
      temperatura: [],
      humedad: [],
      presion: [],
      co2: []
    };

    results.forEach(entry => {
      const time = new Date(entry.time).getTime();
      data.oxNitroso.push({ time: time, y: Number(entry.ox_nitroso) });
      data.porcOxNitroso.push({ time: time, y: Number(entry.porc_ox_nitroso) });
      data.voltOxNitroso.push({ time: time, y: Number(entry.volt_ox_nitroso) });
      data.metano.push({ time: time, y: Number(entry.metano) });
      data.porcMetano.push({ time: time, y: Number(entry.porc_metano) });
      data.voltMetano.push({ time: time, y: Number(entry.volt_metano) });
      data.temperatura.push({ time: time, y: Number(entry.temperatura) });
      data.humedad.push({ time: time, y: Number(entry.humedad) });
      data.presion.push({ time: time, y: Number(entry.presion) });
      data.co2.push({ time: time, y: Number(entry.co2) });
    });

    res.json(data);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor Node.js está corriendo en el puerto ${PORT}`);
});
