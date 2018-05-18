const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const authConfig = require("../config/auth")

const User = require("../models/user") 

const router = express.Router()

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    })
}

router.post("/register", async (req, res) => {
    const { email } = req.body

    try {
        if (await User.findOne({ email })){
            return res.json({ error: "User already exists" })
        }

        const user = await User.create(req.body)

        user.password = undefined

        return res.send({ 
            user,
            token: generateToken({id: user.id}) 
        })

    } catch (err) {
        return res.json({ error: "Registration Failed" });
    }
})

router.post("/authenticate", async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select("+password")

    if (!user) 
        return res.json({ error: "User not found"})

    if(!await bcrypt.compare(password, user.password))
        return res.json({ error: "Invalid password"})


    user.password = undefined

    res.json({ 
        user: user,
        token: generateToken({id: user.id}) 
    })
})

router.post("/verifyToken", async (req, res) => {

    const { token } = req.body

    if (!token)
        return res.json({ valid: false, error: "No Token provided"}) 

    const parts = token.split(" ");

    if (parts.length != 2)
        return res.json({ valid: false, error: "Token Error" }) 

    const [ scheme, tok ] = parts;

    if ( !(scheme === "Bearer") )
        return res.json({ valid: false, error: "Token malformatted" }) 

    jwt.verify(tok, authConfig.secret, (err, decoded) => {

        if (err) return res.status(401).send({ error: "Token Invalid"})
        
        return res.json({ valid: true }) 
        
    })

})

module.exports = (app) => app.use("/auth", router) 