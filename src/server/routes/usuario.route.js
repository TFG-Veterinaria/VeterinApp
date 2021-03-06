const express = require('express');
const cors = require('cors');
const router = express.Router();

const usuario_controller = require('../controllers/usuario.controller');

router.get('/', cors(), usuario_controller.getUsuarios);
router.post('/login', cors(), usuario_controller.login);
router.get('/test', cors(), usuario_controller.test);
router.post('/create', cors(), usuario_controller.createUsuario);
router.get('/:id', cors(), usuario_controller.displayUsuario);
router.post('/:id/update', cors(), usuario_controller.updateUsuario);
router.delete('/:id', cors(), usuario_controller.deleteUsuario);
router.get('/token/:id', cors(), usuario_controller.getUserByToken);
router.post('/updateAjustes/:id', cors(), usuario_controller.updateAjustes);


module.exports = router;
