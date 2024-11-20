import { gql } from "apollo-server";

const typeDefs = gql`

  type Test {
    username: String @constraint(pattern: "^[0-9a-zA-Z]*$")
    password: String @constraint(pattern: "^[0-9]*$")
  }

  type Profile {
    username: String
    password: String
    working_hours: WorkingHours
    dp: String
  }

  type WorkingHours {
    day_start_time: String
    day_end_time: String
  }

  input RegisterInput {
    username: String
    password: String
    dob: String
  }
  
  type Query {
    get: [Test]
    profiles: [Profile]
  }
  
  type Mutation {
    set(u:String,p:String):Test
    registerProfile(profile:RegisterInput):String
  }

`;

export default typeDefs