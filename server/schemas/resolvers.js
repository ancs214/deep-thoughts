const { User, Thought } = require('../models');

const resolvers = {
    Query: {
     thoughts: async (parent, { username }) => {
        //ternary op: if username exists, set params to an object with a username key set to that value
        const params = username ? { username } : {};
        //perform  .find() method on the Thought model and return in descending order
        return Thought.find(params).sort({ createdAt: -1 });
     }
    }
  };
  
  module.exports = resolvers;