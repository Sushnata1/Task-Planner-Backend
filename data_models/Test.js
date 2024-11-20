import mongoose from 'mongoose'

const TestSchema = new mongoose.Schema({
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
  
  mongoose.model("Test",TestSchema)