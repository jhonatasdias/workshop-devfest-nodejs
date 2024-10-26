const express = require('express');
const router = express.Router();
const Restaurantes = require('./restaurantes-sequelize');

const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    return phoneRegex.test(phone);
};

router.get('/', async (req, res) => {

    const restaurantes = await Restaurantes.findAll();

    res.status(200).json(restaurantes);

});


router.get('/:id', async (req, res) => {
    
    const id = req.params.id;

    const restaurante = await Restaurantes.findByPk(id);

    if (!restaurante) {
        return res.status(404).send({ message: 'Restaurante não encontrado.' });
    }

    res.status(200).json(restaurante);
});

router.post('/', async (req, res, next) => {
    
    try {
        
        const restaurantes = req.body;
        const requiredFields = ['nome', 'especialidade', 'endereco', 'telefone', 'avaliacao'];
    
        for (const field of requiredFields) {
            if (!restaurantes[field]) {
                return res.status(400).send({ message: `Campo ${field} é obrigatório.` });
            }
        }
    
        if (!validatePhoneNumber(restaurantes.telefone)) {
            return res.status(400).send({ message: 'Telefone inválido. O formato correto é (xx) 99999-9999.' });
        }
    
        const newRestaurante = await Restaurantes.create(restaurantes);
    
        res.status(201).json(newRestaurante);

    } catch (error) {
        next(error);
    }
    
});


router.put('/:id', async (req, res) => {
    
    const id = req.params.id;
    const restaurante = req.body;

    await Restaurantes.update(restaurante, { where: { id } });

    res.status(204).send();
});


router.patch('/:id', async (req, res) => {
    
    const id = req.params.id;
    const restauranteFields = req.body;

    await Restaurantes.update(restauranteFields, { where: { id } });

    res.status(204).send();
});


router.delete('/:id', async (req, res) => {
    
    const id = req.params.id;

    await Restaurantes.destroy({ where: { id } });

    res.status(204).send();
});

module.exports = router;