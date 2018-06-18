const mongoose = require("../database")
const bcrypt = require("bcryptjs")

const Schema = mongoose.Schema

const UserSchema = mongoose.Schema({
    name: {
      type: String,
      required: true  
    },
    userName: {
        type: String,
        required: false
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
    favorites: [
        {
            type: Schema.Types.ObjectId, ref: 'Video'
        }
    ],
    watchList: [
        {
            type: Schema.Types.ObjectId, ref: 'Video'
        }
    ],
    isProducer: {
        type: Boolean,
        required: true
    },
    isPortfolioActivated: {
        type: Boolean
    },
    portfolioDescription: {
        type: String
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