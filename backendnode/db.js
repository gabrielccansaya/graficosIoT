// db.js
const mysql = require('mysql2');

// Configuración de conexión a MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hostemb2_usrGas',
  password: 'MonitoreoGas2024',
  database: 'hostemb2_ProyectoGases',
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos: ' + err.stack);
    return;
  }
  console.log('Conectado a la base de datos MySQL con id ' + connection.threadId);
});

module.exports = {
  query: (sql, values) => {
    return new Promise((resolve, reject) => {
      connection.query(sql, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  close: () => {
    connection.end();
  },
};
