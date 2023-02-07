const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const db = require('./config/connection');
const routes = require('./routes');
const { typeDefs, resolvers} = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 4000
async function startServer() {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
  })

  await apolloServer.start()

  apolloServer.applyMiddleware({app: app});

  app.use((req, res) => {
    res.send('Hello from express apollo server')
  })

  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/googlebooks', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  console.log('Mongoose connected....')

  app.listen(PORT, () => console.log('server running on port 4000'))


}

startServer();