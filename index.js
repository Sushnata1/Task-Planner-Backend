import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import mongoose from "mongoose";

import typeDefs from "./graphql/auth/typedefs.js";

import dotenv from "dotenv";
dotenv.config();

let config = process.env;

import './data_models/Test.js';

import resolvers from "./graphql/auth/resolvers.js";

mongoose.connect(config['DB_URI']);

mongoose.connection.on("connected", () => {
  console.log("🚀 Connected to mongodb");
});

mongoose.connection.on("error", (err) => {
  console.log("error : ", err);
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});