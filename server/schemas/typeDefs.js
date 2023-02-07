const { gql } = require('apollo-server-express');

const typeDefs = gql`
    input BookInput {
        authors: String
        description: String
        title: String
        bookId: String
        image: String
        link: String
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        authors: String
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        getAllUsers: [User]
        user(username: String!): User
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): User
    }



`;

module.exports = typeDefs;