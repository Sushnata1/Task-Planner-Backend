import mongoose from "mongoose";

const Profiles = mongoose.model("Test")

export default {
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