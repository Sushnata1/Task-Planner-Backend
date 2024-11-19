import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

let config = process.env;

const userSchema = new mongoose.Schema({
  username:{
      type:String,
      required:true
  },
  password:{
      type:String,
      required:true
  }, 
},{
  collection:"Test"
})

mongoose.model("Test",userSchema)

const Profiles = mongoose.model("Test")

const typeDefs = gql`

  type Test {
    username: String
    password: String
  }
  
  type Query {
    get: [Test]
  }
  
  type Mutation {
    set(u:String,p:String):Test
  }

`;

const resolver = {
  Query: {
    get: async () => {      
      return await Profiles.find({});
    }
  },
  Mutation: {
    set: async (_,{u,p}) => {
      const newTest = new Profiles({username:u,password:p});
      return await newTest.save();
    }
  }
}

mongoose.connect(config['DB_URI']);

mongoose.connection.on("connected", () => {
  console.log("🚀 Connected to mongodb");
});

mongoose.connection.on("error", (err) => {
  console.log("error : ", err);
});

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolver,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});