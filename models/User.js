const mongoose = require("../database")
const bcrypt = require("bcryptjs")

const UserSchema = mongoose.Schema({
    name: {
      type: String,
      required: true  
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    }, 
    accountActivated: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

UserSchema.pre("save", async function(next){
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
})

const User = mongoose.model("User", UserSchema)

User.favoriteVideo = () => {

}

User.addVideoOnWatchlist = () => {

}

User.deactivateAccount = () => {
    
}

module.exports = User