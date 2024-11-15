import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const typeDefs = gql`
  type Query {
    status: Boolean
  }
`;

const resolver = {
    Query:{
        status:()=>{
            return true;
        }
    }
}

const server = new ApolloServer({
    typeDefs : typeDefs,
    resolvers: resolver,
    plugins:[ApolloServerPluginLandingPageGraphQLPlayground()]
});

 //server.listen(4000);
 server.listen().then(({url})=>{
 console.log(`server ready at ${url}`)
 });