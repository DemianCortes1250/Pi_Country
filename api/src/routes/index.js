const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countryRoutes = require('./countryRoutes.js');
const activityRoutes = require('./activityRoutes.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/countries', countryRoutes)
router.use('/activity', activityRoutes)

module.exports = router;
