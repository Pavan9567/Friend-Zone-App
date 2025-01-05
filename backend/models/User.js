const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

UserSchema.pre('save', async function (next) {
    console.log("Is password modified?", this.isModified('password'));
    if (!this.isModified('password')) {
        console.log("Password not modified. Skipping hashing.");
        return next();
    }

    // Proceed to hash the password if modified
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        console.log("Password hashed successfully.");
        next();
    } catch (error) {
        next(error);
    }
});




module.exports = mongoose.model("User", UserSchema);