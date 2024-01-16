const { Router } = require('express');
const teamsRouter = Router();
const getTeams = require('../handlers/handlerGetTeams')



teamsRouter.get('/', getTeams)



module.exports = teamsRouter