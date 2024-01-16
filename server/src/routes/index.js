const { Router } = require("express");
const driversRouter = require('./drivers.routes');
const teamsRouter = require('./teams.routes');

const router = Router();

router.use((req, res, next) => {
    console.log(`Solicitud a la ruta: ${req.url}`);
    next();
});

router.use('/drivers', driversRouter);
router.use('/teams', teamsRouter);

module.exports = router;
