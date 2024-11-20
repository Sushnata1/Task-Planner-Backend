import mongoose from 'mongoose'

import DEFAULT_IMG from './default_img.js'

const ProfileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        default: Date.now(),
    },
    //Date actually stores timestamp
    working_hours : {
        day_start_time: {
            type: Date,
            required: true,
        },
        day_end_time: {
            type: Date,
            required: true,
        }
    },
    dp: { 
        type: Buffer, 
        default: () => Buffer.from(DEFAULT_IMG, 'base64') }, // Base64 encoded default image
        contentType: { type: String, default: 'image/jpeg' } // Default MIME type
    }
    , {
        collection: "Profile"
    })

mongoose.model("Profile", ProfileSchema)