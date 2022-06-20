const { User, Thought } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        
        thoughts: async (parent, { username }) => {
            //ternary op: if username exists, set params to an object with a username key set to that value. if username doesnt exist, it will return all thoughts
            const params = username ? { username } : {};
            //find thought by username and return in descending order
            return Thought.find(params).sort({ createdAt: -1 });
        },
        thought: async (parent, { _id }) => {
            //find thought by id
            return Thought.findOne({ _id });
        },
        // get all users
        users: async () => {
            return User.find()
                //omit __v property and user's password info
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        },
        // get a user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        },
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            return user;
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            return user;
        }
    }
};

module.exports = resolvers;