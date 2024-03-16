
import mongoose from "mongoose"

const userSchema =  mongoose.Schema({
    first_name: {
        type:String,
        required:true
    },
    last_name: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true,
        index: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    rol:{
        type: String,
        required: true,
    }
})

export const UserModel = new mongoose.model('user',userSchema)