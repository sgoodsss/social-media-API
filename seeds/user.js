require("dotenv").config();
const connection = require('../config/connection');

const { User, Thought } = require("../models");
const userData = [
    {
        username: "userOne",
        email: "userOne@gmail.com"
    },
    {
        username: "userTwo",
        email: "userTwo@gmail.com"
    },
    {
        username: "userThree",
        email: "userThree@gmail.com"
    },
    {
        username: "userFour",
        email: "userFour@gmail.com"
    },
    {
        username: "userFive",
        email: "userFive@gmail.com"
    }
]

const thoughtData = [
    {
        thoughtText: "Thought 1",
        username: "userOne"
    },
    {
        thoughtText: "Thought 2",
        username: "userTwo"
    },
    {
        thoughtText: "Thought 3",
        username: "userThree"
    },
    {
        thoughtText: "Thought 4",
        username: "userFour"
    },
    {
        thoughtText: "Thought 5",
        username: "userFive"
    }
]

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

    await User.collection.deleteMany({});
    await Thought.collection.deleteMany({});
  // Add users to the collection and await the results
  await User.collection.insertMany(userData); 
  await Thought.collection.insertMany(thoughtData);

  // Log out the seed data to indicate what should appear in the database
  console.info('Seeding complete! 🌱');
  process.exit(0);
});