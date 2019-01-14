const express = require('express');
const router = express.Router();

const celebritiesController = require('../controllers/celebrities.controller');

router.get('/', celebritiesController.list)
router.get('/create', celebritiesController.create)

router.post('/create', celebritiesController.doCreate)

router.get('/:id/edit', celebritiesController.edit)
router.post('/:id/edit', celebritiesController.doEdit)

router.get('/:id', celebritiesController.get)
router.post('/:id/delete', celebritiesController.delete)

module.exports = router;
