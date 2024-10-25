const sqlite3 = require('sqlite3').verbose();

let db;

exports.dbConnection = () => {
    db = new sqlite3.Database('./delivery.db', (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
        } else {
            console.log('Connected to the delivery database.');
            db.run(`CREATE TABLE IF NOT EXISTS restaurantes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT,
                especialidade TEXT,
                endereco TEXT,
                telefone TEXT,
                avaliacao REAL
            )`);
        }
    });
};

exports.getDb = () => {
    return db;
};