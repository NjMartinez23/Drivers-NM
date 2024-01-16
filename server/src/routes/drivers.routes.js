const { Router } = require('express');
const diversRouter = Router();
const getAll = require('../handlers/handlerGetAll')
const getById = require('../handlers/handlerGetById');
const getByName = require('../handlers/handlerGetByName');
const postCreate = require('../handlers/handlerPostCreate');


diversRouter.get('/', getAll);
diversRouter.get('/name', getByName);
diversRouter.get('/:idDriver', getById);
diversRouter.post('/', postCreate);


module.exports = diversRouter;