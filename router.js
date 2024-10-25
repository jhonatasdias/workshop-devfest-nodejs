const express = require('express');
const router = express.Router();
const { getDb } = require('./db-connection');

router.get('/', (req, res) => {
    const db = getDb();
    db.all(`SELECT * FROM restaurantes`, [], (err, rows) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).json(rows);
    });
});


router.get('/:id', (req, res) => {
    const db = getDb(); 
    const id = req.params.id;
    db.get(`SELECT * FROM restaurantes WHERE id = ?`, [id], (err, row) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        if (!row) {
            return res.status(404).send('Restaurant not found');
        }
        res.status(200).json(row);
    });
});

router.post('/', (req, res) => {
    const db = getDb(); 
    const { nome, especialidade, endereco, telefone, avaliacao } = req.body;
    // salvar e retornar todos os dados do restaurante
    db.run(
        `INSERT INTO restaurantes (nome, especialidade, endereco, telefone, avaliacao) VALUES (?, ?, ?, ?, ?)`,
        [nome, especialidade, endereco, telefone, avaliacao],
        function (err) {
            if (err) {
                return res.status(500).send(err.message);
            }
            db.get(`SELECT * FROM restaurantes WHERE id = ?`, [this.lastID], (err, row) => {
                if (err) {
                    return res.status(500).send(err.message);
                }
                res.status(201).json(row);
            });
        }
    );
});


router.put('/:id', (req, res) => {
    const db = getDb(); 
    const id = req.params.id;
    const { nome, especialidade, endereco, telefone, avaliacao } = req.body;
    db.run(
        `UPDATE restaurantes SET nome = ?, especialidade = ?, endereco = ?, telefone = ?, avaliacao = ? WHERE id = ?`,
        [nome, especialidade, endereco, telefone, avaliacao, id],
        function (err) {
            if (err) {
                return res.status(500).send(err.message);
            }
            db.get(`SELECT * FROM restaurantes WHERE id = ?`, [id], (err, row) => {
                if (err) {
                    return res.status(500).send(err.message);
                }
                res.status(200).json(row);
            });
        }
    );
});


router.patch('/:id', (req, res) => {
    const db = getDb(); 
    const id = req.params.id;
    const { nome, especialidade, endereco, telefone, avaliacao } = req.body;

    const fields = [];
    if (nome) fields.push(`nome = '${nome}'`);
    if (especialidade) fields.push(`especialidade = '${especialidade}'`);
    if (endereco) fields.push(`endereco = '${endereco}'`);
    if (telefone) fields.push(`telefone = '${telefone}'`);
    if (avaliacao) fields.push(`avaliacao = ${avaliacao}`);

    const updateQuery = `UPDATE restaurantes SET ${fields.join(', ')} WHERE id = ?`;

    db.run(updateQuery, [id], function (err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        db.get(`SELECT * FROM restaurantes WHERE id = ?`, [id], (err, row) => {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.status(200).json(row);
        });
    });
});


router.delete('/:id', (req, res) => {
    const db = getDb(); 
    const id = req.params.id;
    db.run(`DELETE FROM restaurantes WHERE id = ?`, [id], function (err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(204).send();
    });
});

module.exports = router;