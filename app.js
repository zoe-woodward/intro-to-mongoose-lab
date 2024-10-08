/*const prompt = require('prompt-sync')();

const username = prompt('What is your name? ');

console.log(`Your name is ${username}`);*/

const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const prompt = require('prompt-sync')();
const Customer = require('./models/customer.js');

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');
  await runQueries()
}

///////////////////////////////////////////////////////////////////////////

const runQueries = async () => {
  console.log('Queries running.')

  const username = prompt('What is your name?');
    console.log(`Welcome to the CRM ${username}`);

  const displayMenu = () => {
    console.log('Main Menu');
    console.log('1. Create Customer');
    console.log('2. View Customers');
    console.log('3. Update Customer');
    console.log('4. Delete Customer');
    console.log('5. Quit');
    const choice = prompt('Choose an action (1-5): ');
    return choice;
  };
  
  const createCustomer = async () => {
    const name = prompt('Enter customer name: ');
    const age = prompt('Enter customer age: ');
    const customer = new Customer({ name, age });
    await customer.save();
    console.log('Customer created:', customer);
  };
  
  const viewCustomers = async () => {
    const customers = await Customer.find();
    if (customers.length === 0) {
      console.log('No customers found.');
      return;
    }
    console.log('Customers:');
    customers.forEach(customer => {
      console.log(`ID: ${customer._id}, Name: ${customer.name}, Age: ${customer.age}`);
    });
  };
  
  const updateCustomer = async () => {
    const customers = await Customer.find();
    if (customers.length === 0) {
      console.log('No customers to update.');
      return;
    }
    viewCustomers();
    const id = prompt('Enter the ID of the customer to update: ');
    const name = prompt('Enter new customer name: ');
    const age = prompt('Enter new customer age: ');
    await Customer.findByIdAndUpdate(id, { name, age });
    console.log('Customer updated.');
  };
  
  const deleteCustomer = async () => {
    const customers = await Customer.find();
    if (customers.length === 0) {
      console.log('No customers to delete.');
      return;
    }
    viewCustomers();
    const id = prompt('Enter the ID of the customer to delete: ');
    await Customer.findByIdAndDelete(id);
    console.log('Customer deleted.');
  };
  
  const actions = async () => {
    while (true) {
      const choice = displayMenu();
      switch (choice) {
        case '1':
          await createCustomer();
          break;
        case '2':
          await viewCustomers();
          break;
        case '3':
          await updateCustomer();
          break;
        case '4':
          await deleteCustomer();
          break;
        case '5':
          console.log(`Goodbye ${username}!`);
          await mongoose.connection.close()
          console.log('Disconnected from MongoDB');
          process.exit();
          break;
      }
    }
  };
  
  actions();
};

  
connect()