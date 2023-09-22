const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432,
});

const getServices = (request, response) => {
  pool.query('SELECT * FROM servicos ORDER BY nome', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getServicesBy = (request, response, servico) => {
  pool.query(
    'SELECT * FROM servicos where servico = $1 order by nome',
    [servico],
    (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows.length === 0) {
        response.status(404).send('<h1>Não encontrado</h1>');
      } else {
        response.status(200).json(results.rows);
      }
    }
  );
};

module.exports = { getServices, getServicesBy };
