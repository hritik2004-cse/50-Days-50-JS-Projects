import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    id:{
        type: Number,
        unique: true,
        required: true
    },
    projectImg:{
        type: String, // Cloudinary URL
        required: true
    },
    projectName:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
        maxlength: 500 // Limit description length
    },
    tags:[
        {
            type: String
        }
    ],
    liveLink:{
        type: String,
        required: true
    },
    githubLink:{
        type: String,
        required: true
    },
    cloudinaryPublicId: {
        type: String, // Store Cloudinary public ID for deletion
        required: true
    }
}, {timestamps: true});

export const Content = mongoose.model("Content", contentSchema);