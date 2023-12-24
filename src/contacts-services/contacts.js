// contacts.js

const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "../../db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function getContactById(contactId) {
  const contactsList = await listContacts();
  const filterById = contactsList.find((contact) => contact.id === contactId);
  return filterById || null;
}

async function removeContact(contactId) {
  const contactsList = await listContacts();
  const index = contactsList.findIndex((contact) => contact.id === contactId);

  if (index !== -1) {
    const deletedContact = contactsList.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
    return deletedContact;
  } else {
    return null;
  }
}

async function addContact(data) {
  const contactsList = await listContacts();
  const newContact = {
    id: Date.now(),
    ...data,
  };
  contactsList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
