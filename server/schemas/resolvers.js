const { User, Book } = require('../models');
const { signToken } = require('../utils/auth')
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        getAllUsers: async () => {
            return await User.find();
        },
        user: async (parent, {username }) => {
            return User.findOne({username}).populate('savedBooks')
        }
    },
    Mutation: {
        createUser: async (parent, args) => {
            const { username, email, password} = args;
            const user = await User.create({ username, email, password });
            return user;
        }
    }
}

module.exports = resolvers;