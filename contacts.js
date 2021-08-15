const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    try {
      const contactsData = JSON.parse(data);
      console.table(contactsData);
    } catch (error) {
      console.log("listContacts error", err);
    }
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    try {
      const parsedData = JSON.parse(data);
      const getContact = parsedData.find((item) => item.id === contactId);
      console.log("getContact:", getContact);
    } catch (error) {
      console.log("listContacts error:", err);
    }
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    try {
      const parsedData = JSON.parse(data);
      const deleteContact = parsedData.filter((item) => item.id !== contactId);

      fs.writeFile(contactsPath, JSON.stringify(deleteContact), () => {
        console.log("removeContact:", deleteContact);
      });
    } catch (error) {
      console.log("removeContact error:", err);
    }
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, { encoding: "utf-8" }, (err, data) => {
    try {
      const parsedData = JSON.parse(data);
      const newContact = { name, email, phone };
      const allContacts = [...parsedData, newContact];
      fs.writeFile(contactsPath, JSON.stringify(allContacts), () => {
        console.log("Contact was added.");
        console.log(allContacts);
      });
    } catch (error) {
      console.log("error:", err);
    }
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
