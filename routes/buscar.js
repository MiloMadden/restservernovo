const {Router} = require('express')
const router = Router()
const {buscar} = require('../controllers/buscar')

router.get('/:collection/:term', buscar)

module.exports = router