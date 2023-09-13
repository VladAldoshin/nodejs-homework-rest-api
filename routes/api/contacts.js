const express = require('express');
const ctrl = require("../../controllers/contacts");
const router = express.Router();
const {schemas} = require("../../models/contact");
const {validateBody} = require("../../middlewares");


router.get('/', ctrl.getAll);
router.get('/:contactId', ctrl.getById);
router.post('/', validateBody(schemas.addSchema), ctrl.add);
router.delete('/:contactId', ctrl.deleteById);
router.put('/:contactId', validateBody(schemas.addSchema), ctrl.updateById);
router.patch('/:contactId/favorite', validateBody (schemas.updateFavoriteSchema),ctrl.updateFavorite);

module.exports = router;
