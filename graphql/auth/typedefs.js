import { gql } from "apollo-server";

export default gql`

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