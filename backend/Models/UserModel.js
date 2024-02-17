import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: "String",
        required: true,
        min:4,
        unique: true
    },
    
    email: {
        type: "String",
        required: true,
    },

    password: {
        type: "String",
        required: true,
    }
});

// const UserModel = model('User', UserSchema);

// module.exports = UserModel;

export default mongoose.model('User', UserSchema);