import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import mongoose from "mongoose";

import { makeExecutableSchema } from '@graphql-tools/schema';
import { constraintDirective, constraintDirectiveTypeDefs } from 'graphql-constraint-directive';
import { typeDefs as scalarTypeDefs, resolvers as scalarResolvers } from 'graphql-scalars';

import typeDefs from "./graphql/auth/typedefs.js";

import dotenv from "dotenv";
dotenv.config();

let config = process.env;

import './data_models/Test.js';

import resolvers from "./graphql/auth/resolvers.js";

console.log("🚀 Connecting to mongodb");

mongoose.connect(config['DB_URI']);

mongoose.connection.on("connected", () => {
  console.log("🚀 Connected to mongodb");
});

mongoose.connection.on("error", (err) => {
  console.log("error : ", err);
});

let schema = makeExecutableSchema({
  typeDefs: [...scalarTypeDefs, constraintDirectiveTypeDefs, typeDefs],
  resolvers: {
    ... scalarResolvers,
    ... resolvers,
  },
})
schema = constraintDirective()(schema)

const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});