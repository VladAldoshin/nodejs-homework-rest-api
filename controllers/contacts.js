const {Contact} = require("../models/contact")
const { HttpError, ctrlWrapper } = require('../helpers');


const getAll = async (req, res) => {
    const result = await Contact.find()
    res.json(result)
};

const getById = async (req, res) => {
const { contactId  } = req.params;
const result = await Contact.findOne({_id:contactId})
if (!result) {
throw HttpError(404,'Not found');}
res.status(200).json(result);
};

const add = async (req, res) => {
const result = await Contact.create(req.body)
res.status(201).json(result)
};

const updateById = async (req, res) => {
if (!req.body) {res.status(400).json({ message: 'missing fields' })}
const { contactId } = req.params;
const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});
if (!result) throw HttpError(404, 'Not found')
res.json(result);
};

const updateFavorite = async (req, res) => {
  if (!req.body) {res.status(400).json({ message: 'missing field favorite' })}
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});
  if (!result) throw HttpError(404, 'Not found')
  res.json(result);
  };


const deleteById = async (req, res) => {
const { contactId  } = req.params;
const result = await Contact.findByIdAndRemove(contactId)
     if (!result) {
       throw HttpError(404,'Not found');
     }
     res.status(200).json({message:'contact deleted'});
};
    

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),
    updateFavorite: ctrlWrapper(updateFavorite),
} 