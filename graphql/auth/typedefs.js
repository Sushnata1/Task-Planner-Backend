import { gql } from "apollo-server";

const typeDefs = gql`

  type Test {
    username: String @constraint(pattern: "^[0-9a-zA-Z]*$")
    password: String @constraint(minLength: 8)
  }

  type Profile {
    username: String! @constraint(pattern: "^[0-9a-zA-Z]*$")
    password: String! @constraint(minLength: 8)
    working_hours: WorkingHours
    dob: Date
    dp: Byte
  }

  type WorkingHours {
    day_start_time: Time
    day_end_time: Time
  }

  input WorkingHoursInput {
    day_start_time: Time = "07:00:00+05:30" # 7am IST
    day_end_time: Time = "22:00:00+05:30" # 11pm IST
  }

  input RegisterInput {
    username: String! @constraint(pattern: "^[0-9a-zA-Z]*$") 
    password: String! @constraint(minLength: 8)
    working_hours: WorkingHoursInput
    dob: Date
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