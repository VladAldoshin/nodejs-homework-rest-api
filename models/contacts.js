const fs = require('fs/promises');
const path = require("path");
const { nanoid } = require("nanoid");


const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async (contactList) => await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));


const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contactList = await listContacts()
  const result = contactList.find((item) => item.id === contactId)
  if (!result) {
    return null
  }
  return result
};

const removeContact = async (contactId) => {
  const contactList = await listContacts();
  const index = contactList.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contactList.splice(index, 1);
  await updateContacts(contactList);
  return result;
};

const addContact = async ({name, email, phone}) => {
  const contactList = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone
  };
  contactList.push(newContact);
  await updateContacts(contactList);
  return newContact;
};

const updateContact = async (id, { name, email, phone }) => {
  const contactList = await listContacts()
  const index = contactList.findIndex((item) => item.id === id)
  if (index === -1) {
    return null
  }
  contactList[index] = { id, name, email, phone }
  await updateContacts(contactList)
  return contactList[index]
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
