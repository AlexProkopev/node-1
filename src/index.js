// const { program } = require("commander");
const contacts = require('./contacts-services/contacts.js');
const {program} = require("commander");

const invokeAction = async ({action,id,name,email,phone}) => {
 switch (action) {
    case "list":
        const contactsList = await contacts.listContacts();
        console.log(contactsList);
        break;

    case "get":
    const contact = await contacts.getContactById(id);
    console.log(contact);
    break;

    case "remove": 
    const removeContact = await contacts.removeContact(id);
    console.log(removeContact);
    break

    case "add":
    const newContact = await contacts.addContact({name,email,phone});
    return console.log(newContact);
    
    

    default:
        break;
 }
};
// invokeAction({action:"read"})
// invokeAction({action:"getById", id:"05olLMgyVQdWRwgKfg5J6"})

// invokeAction({action:"add", name:"JAlex",email:"envkt@example.com", phone:"1234567890"})

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

  program.parse(process.argv);

  const options = program.opts();
  
  invokeAction(options);